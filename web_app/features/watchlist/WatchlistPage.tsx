'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { TimeRangeSelector } from '../../components/ui/TimeRangeSelector';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getProvider } from '../../lib/data/providerRegistry';
import { WatchlistItem } from '../../lib/data/types';
import { useLocale } from '../../lib/locales/LocaleProvider';

function WatchlistProductCard({
  item,
  labels,
}: {
  item: WatchlistItem;
  labels: {
    periodSales: string;
    stock: string;
    margin: string;
    recommendation: string;
  };
}) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow hover-lift min-w-0">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="min-w-0">
          <p className="text-xs font-mono font-black text-primary whitespace-nowrap">{item.productId}</p>
          <h3 className="text-lg font-headline font-bold text-on-surface truncate mt-1" title={item.name}>{item.name}</h3>
          <p className="text-sm text-on-surface-variant mt-1">{item.category}</p>
        </div>
        <StatusBadge label={item.status} badgeClass="bg-primary-fixed text-on-primary-fixed-variant" dotClass="bg-primary" />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          [labels.periodSales, item.periodSales],
          [labels.stock, item.stock],
          [labels.margin, item.margin],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-surface-container-low px-3 py-3 min-w-0">
            <p className="text-[10px] font-label font-bold uppercase tracking-wider text-on-surface-variant truncate" title={label}>{label}</p>
            <p className="text-sm font-headline font-black text-on-surface mt-1 truncate" title={value}>{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
        <p className="text-[11px] font-label font-bold uppercase tracking-wider text-primary mb-1">{labels.recommendation}</p>
        <p className="text-sm text-on-surface-variant leading-relaxed">{item.recommendation}</p>
      </div>
    </div>
  );
}

export default function WatchlistPage() {
  const client = getCurrentClient();
  const provider = getProvider(client.dataProvider);
  const { locale } = useLocale();
  const [timeRange, setTimeRange] = useState('30d');

  const { data, isLoading } = useQuery({
    queryKey: ['watchlist', client.clientId, locale],
    queryFn: () => provider.getWatchlist({ locale }),
  });

  if (isLoading || !data) {
    return (
      <GlassPanel className="min-h-[320px] flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
      </GlassPanel>
    );
  }

  const activeRange = data.timeRanges.some((range) => range.value === timeRange)
    ? timeRange
    : data.timeRanges[0]?.value || '30d';

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
        <PageHeader title={data.title} description={data.description} className="mb-0 max-w-5xl" />
        <div className="flex flex-col gap-2 xl:items-end">
          <p className="text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant px-1">{data.labels.timeframe}</p>
          <TimeRangeSelector options={data.timeRanges} value={activeRange} onChange={setTimeRange} />
        </div>
      </div>

      <section>
        <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.pinnedProducts}</h2>
        {data.items.length === 0 ? (
          <GlassPanel className="min-h-[260px] flex items-center justify-center">
            <div className="text-center max-w-md">
              <span className="material-symbols-outlined text-primary text-[42px] mb-3">push_pin</span>
              <h3 className="text-xl font-headline font-bold text-on-surface">{data.labels.emptyTitle}</h3>
              <p className="text-sm text-on-surface-variant mt-2">{data.labels.emptyDescription}</p>
            </div>
          </GlassPanel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.items.map((item) => (
              <WatchlistProductCard key={item.id} item={item} labels={data.labels} />
            ))}
            <button
              type="button"
              className="min-h-[292px] rounded-2xl border border-dashed border-outline-variant/60 bg-surface-container-lowest/50 p-5 text-left hover:bg-surface-container-low transition-colors"
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <span className="material-symbols-outlined !leading-none text-[24px]">add</span>
                </span>
                <h3 className="text-lg font-headline font-bold text-on-surface">{data.labels.addProduct}</h3>
                <p className="text-sm text-on-surface-variant mt-2 max-w-xs">{data.labels.addProductDescription}</p>
              </div>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
