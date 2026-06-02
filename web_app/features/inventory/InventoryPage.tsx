'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getProvider } from '../../lib/data/providerRegistry';
import { InventoryPrediction, DeadStockItem } from '../../lib/data/types';
import { PageHeader } from '../../components/ui/PageHeader';
import { MetricCard } from '../../components/ui/MetricCard';
import { StatusBadge } from '../../components/ui/StatusBadge';

type UrgencyLevel = 'magas' | 'kozepes' | 'alacsony';

function computeUrgency(currentStock: number, recommendedPurchase: number): UrgencyLevel {
    if (currentStock <= 0) return 'magas';
    const ratio = recommendedPurchase / currentStock;
    if (ratio >= 1.0) return 'magas';
    if (ratio >= 0.5) return 'kozepes';
    return 'alacsony';
}

const URGENCY_CONFIG: Record<UrgencyLevel, {
    label: string;
    badgeClass: string;
    dotClass: string;
    textClass?: string;
}> = {
    magas: {
        label: 'Magas',
        badgeClass: 'bg-[#ffdad6] text-[#93000a]',
        dotClass: 'bg-error',
        textClass: 'text-error',
    },
    kozepes: {
        label: 'Közepes',
        badgeClass: 'bg-[#fff8e1] text-[#ff8f00]',
        dotClass: 'bg-[#ff8f00]',
        textClass: 'text-[#ff8f00]',
    },
    alacsony: {
        label: 'Alacsony',
        badgeClass: 'bg-[#e3e2e7] text-[#474553]',
        dotClass: 'bg-outline',
        textClass: 'text-on-surface',
    },
};

function UrgencyBadge({ currentStock, recommendedPurchase }: { currentStock: number; recommendedPurchase: number }) {
    const level = computeUrgency(currentStock, recommendedPurchase);
    const cfg = URGENCY_CONFIG[level];
    return <StatusBadge label={cfg.label} badgeClass={cfg.badgeClass} dotClass={cfg.dotClass} />;
}

export default function InventoryPage() {
    const client = getCurrentClient();
    const provider = getProvider(client.dataProvider);

    const { data: predictions = [], isLoading: invLoading } = useQuery({
        queryKey: ['inventory', client.clientId],
        queryFn: () => provider.getInventoryPredictions(),
    });

    const { data: deadStock = [], isLoading: dsLoading } = useQuery({
        queryKey: ['deadStock', client.clientId],
        queryFn: () => provider.getDeadStock(),
    });

    type SortCol = 'id' | 'stock' | 'purchase' | 'urgency';
    type SortDir = 'asc' | 'desc';
    const [sortCol, setSortCol] = useState<SortCol>('urgency');
    const [sortDir, setSortDir] = useState<SortDir>('desc');

    const URGENCY_ORDER: Record<UrgencyLevel, number> = { magas: 3, kozepes: 2, alacsony: 1 };

    const handleSort = (col: SortCol) => {
        if (sortCol === col) {
            setSortDir((d: SortDir) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortCol(col);
            setSortDir(col === 'id' ? 'asc' : 'desc');
        }
    };

    const sortedPredictions = [...predictions].sort((a, b) => {
        let cmp = 0;
        if (sortCol === 'id') {
            cmp = (a.productId || '').localeCompare(b.productId || '');
        } else if (sortCol === 'stock') {
            cmp = Number(a.current_stock) - Number(b.current_stock);
        } else if (sortCol === 'purchase') {
            cmp = Number(a.recommended_purchase) - Number(b.recommended_purchase);
        } else if (sortCol === 'urgency') {
            const ua = URGENCY_ORDER[computeUrgency(Number(a.current_stock), Number(a.recommended_purchase))];
            const ub = URGENCY_ORDER[computeUrgency(Number(b.current_stock), Number(b.recommended_purchase))];
            cmp = ua - ub;
        }
        return sortDir === 'asc' ? cmp : -cmp;
    });

    const SortIcon = ({ col }: { col: SortCol }) => (
        sortCol === col
            ? <span className="material-symbols-outlined text-[14px] text-primary">{sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>
            : <span className="material-symbols-outlined text-[14px] opacity-50">swap_vert</span>
    );

    return (
        <div className="w-full space-y-6">
            <PageHeader 
                title="Készlet és Beszerzés" 
                description="Kövesd a készletszinteket, azonosítsd a hiányokat, és kezelj actionable beszerzési javaslatokat."
                className="mb-6"
            />

            <div className="w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MetricCard
                        iconName="account_balance_wallet"
                        title="Teljes Készletérték"
                        value="---"
                        subtitle="Ft"
                        badgeText="Adat nem elérhető"
                    />
                    <MetricCard
                        iconName="warning"
                        iconBgClass="bg-error-container/50"
                        iconClass="text-error"
                        title="Minimum Alatti Tételek"
                        value={invLoading ? '...' : predictions.length}
                        subtitle="tétel"
                        badgeText="Kritikus"
                        badgeClass="text-error bg-error-container/30"
                        containerClass="bg-surface-container-lowest border border-error-container/50"
                    />
                    <MetricCard
                        iconName="local_shipping"
                        iconBgClass="bg-secondary-container/50"
                        iconClass="text-secondary"
                        title="Függőben lévő rendelések"
                        value="---"
                        subtitle="aktív"
                        badgeText="Adat nem elérhető"
                        badgeClass="text-secondary bg-secondary-container/30"
                    />
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 soft-shadow">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-primary text-[22px]">online_prediction</span>
                                Készlet Előrejelzés és Beszerzési Javaslatok
                            </h2>
                            <p className="text-body-sm text-on-surface-variant">Sürgősség = ajánlott beszerzés / jelenlegi készlet aránya.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-error"></div>
                                <span className="text-label-sm text-on-surface font-medium">Magas ≥100%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#ff8f00]"></div>
                                <span className="text-label-sm text-on-surface font-medium">Közepes ≥50%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-outline"></div>
                                <span className="text-label-sm text-on-surface font-medium">Alacsony &lt;50%</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full overflow-hidden">
                        <table className="w-full text-left border-separate border-spacing-y-1">
                            <thead>
                                <tr>
                                    <th className="pb-3 px-4 font-label text-[11px] tracking-wider uppercase text-on-surface-variant font-semibold cursor-pointer select-none hover:text-primary transition-colors border-b border-outline-variant/20" onClick={() => handleSort('id')}>
                                        <div className="flex items-center gap-1">TERMÉK ID <SortIcon col="id" /></div>
                                    </th>
                                    <th className="pb-3 px-4 font-label text-[11px] tracking-wider uppercase text-on-surface-variant font-semibold border-b border-outline-variant/20">NÉV</th>
                                    <th className="pb-3 px-4 font-label text-[11px] tracking-wider uppercase text-on-surface-variant font-semibold text-right cursor-pointer select-none hover:text-primary transition-colors border-b border-outline-variant/20" onClick={() => handleSort('stock')}>
                                        <div className="flex items-center justify-end gap-1">JELENLEGI KÉSZLET <SortIcon col="stock" /></div>
                                    </th>
                                    <th className="pb-3 px-4 font-label text-[11px] tracking-wider uppercase text-on-surface-variant font-semibold text-right cursor-pointer select-none hover:text-primary transition-colors border-b border-outline-variant/20" onClick={() => handleSort('purchase')}>
                                        <div className="flex items-center justify-end gap-1">AJÁNLOTT BESZ. <SortIcon col="purchase" /></div>
                                    </th>
                                    <th className="pb-3 px-4 font-label text-[11px] tracking-wider uppercase text-on-surface-variant font-semibold text-center cursor-pointer select-none hover:text-primary transition-colors border-b border-outline-variant/20" onClick={() => handleSort('urgency')}>
                                        <div className="flex items-center justify-center gap-1">SÜRGŐSSÉG <SortIcon col="urgency" /></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invLoading ? (
                                    <tr>
                                        <td colSpan={5} className="py-10 text-center text-on-surface-variant">
                                            <span className="animate-spin material-symbols-outlined text-outline inline-block mb-2">progress_activity</span>
                                            <p className="text-sm font-medium">Adatok betöltése...</p>
                                        </td>
                                    </tr>
                                ) : sortedPredictions.length > 0 ? (
                                    sortedPredictions.map((item, i) => {
                                        const urgencyLevel = computeUrgency(Number(item.current_stock), Number(item.recommended_purchase));
                                        const urgencyCfg = URGENCY_CONFIG[urgencyLevel];
                                        return (
                                            <tr key={i} className="group cursor-default">
                                                <td className="py-2.5 px-4 text-xs text-on-surface-variant font-mono rounded-l-xl group-hover:bg-surface-container-low transition-colors">{item.productId}</td>
                                                <td className="py-2.5 px-4 text-sm font-medium text-on-surface group-hover:text-primary group-hover:bg-surface-container-low transition-colors" title={item.name}>{item.name || item.productId}</td>
                                                <td className="py-2.5 px-4 text-right group-hover:bg-surface-container-low transition-colors">
                                                    <span className="text-sm text-on-surface tabular-nums">{item.current_stock}</span>{' '}
                                                    <span className="text-xs text-on-surface-variant">{item.unit || 'db'}</span>
                                                </td>
                                                <td className="py-2.5 px-4 text-right group-hover:bg-surface-container-low transition-colors">
                                                    <span className={`text-sm font-bold tabular-nums ${urgencyCfg.textClass || 'text-primary'}`}>+{item.recommended_purchase}</span>{' '}
                                                    <span className="text-xs text-on-surface-variant">{item.unit || 'db'}</span>
                                                </td>
                                                <td className="py-2.5 px-4 rounded-r-xl group-hover:bg-surface-container-low transition-colors">
                                                    <div className="flex justify-center"><UrgencyBadge currentStock={Number(item.current_stock)} recommendedPurchase={Number(item.recommended_purchase)} /></div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan={5} className="py-10 text-center text-on-surface-variant italic text-sm">Nincs azonnali beszerzési igény.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
