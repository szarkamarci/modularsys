'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getRouteConfigMap, getScenarioConfig } from '../../lib/scenarios/scenarioRegistry';
import { ScenarioRouteConfig } from '../../features/overview/types';
import { useLocale } from '../../lib/locales/LocaleProvider';

export default function SideNav() {
    const pathname = usePathname();
    const client = getCurrentClient();
    const { locale } = useLocale();
    const scenario = getScenarioConfig(client.scenarioId, locale);
    const routeConfigMap = getRouteConfigMap(scenario);

    const navItems = client.enabledRoutes
        .map(route => routeConfigMap.get(route))
        .filter((item): item is ScenarioRouteConfig => Boolean(item));

    return (
        <nav className="hidden md:flex flex-col bg-surface-container-low w-64 h-screen border-r border-outline-variant/20 flex-shrink-0 z-30">
            {/* Brand Header */}
            <div className="px-6 py-6 flex items-center gap-3">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-container rounded-xl text-on-primary font-bold text-xl shadow-sm">
                    {client.logoText || client.brandLabel.charAt(0)}
                </div>
                <div>
                    <h1 className="text-xl font-headline font-black text-on-surface tracking-tight leading-tight">{client.brandLabel}</h1>
                </div>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    if (isActive) {
                        return (
                            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 bg-primary-container/40 text-on-primary-container border-r-4 border-primary rounded-l-none rounded-r-full transition-transform duration-200 translate-x-1 group">
                                <span className="material-symbols-outlined text-xl fill-icon text-primary transition-transform group-hover:scale-110" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {item.icon}
                                </span>
                                <span className="text-label-md font-label font-bold text-primary">{item.navLabel || item.label}</span>
                            </Link>
                        );
                    }
                    return (
                        <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all duration-300 group">
                            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">
                                {item.icon}
                            </span>
                            <span className="text-label-md font-label font-medium">{item.navLabel || item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
