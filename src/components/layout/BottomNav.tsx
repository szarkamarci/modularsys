
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getRouteConfigMap, getScenarioConfig } from '../../lib/scenarios/scenarioRegistry';
import { ScenarioRouteConfig } from '../../features/overview/types';
import { useLocale } from '../../lib/locales/LocaleProvider';

// ─── Bottom navigation — shown only on mobile (md: hidden) ───────────────────
// Uses a horizontally scrollable strip so all 6 destinations remain accessible
// without squeezing icons. Matches the Modular Serenity surface/elevation/radius language.
export default function BottomNav() {
    const pathname = useLocation().pathname;
    const client = getCurrentClient();
    const { locale } = useLocale();
    const scenario = getScenarioConfig(client.scenarioId, locale);
    const routeConfigMap = getRouteConfigMap(scenario);
    const navItems = client.enabledRoutes
        .map((route) => routeConfigMap.get(route))
        .filter((item): item is ScenarioRouteConfig => Boolean(item));

    return (
        <nav
            aria-label="Mobil navigáció"
            className={[
                'md:hidden',
                'fixed bottom-4 left-1/2 -translate-x-1/2 z-40',
                'w-[calc(100%-2rem)] max-w-[400px]',
                'bg-surface/90 backdrop-blur-2xl',
                'shadow-[0px_12px_40px_rgba(87,73,194,0.18)]',
                'border border-outline-variant/20',
                'rounded-full',
                'overflow-hidden'
            ].join(' ')}
        >
            {/*
              Horizontally scrollable container:
              - Allows all 6 items to be accessible without cramming
              - scrollbar hidden for clean look
              - snap scrolling for a native feel
            */}
            <div
                className="flex items-stretch overflow-x-auto px-4 py-1.5 gap-1 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
                {navItems.map((item) => {
                    const isScenarioOverview = /^\/demo-dashboard\/scenario\/[^/]+$/.test(item.href);
                    const isActive =
                        item.href === '/demo-dashboard' || isScenarioOverview
                            ? pathname === '/demo-dashboard'
                                ? item.href === '/demo-dashboard'
                                : pathname === item.href
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={[
                                // Base: flex column, centered, snap point so swipe snaps cleanly
                                'flex flex-col items-center justify-center snap-start',
                                // Min-width ensures all items are same width and don't collapse
                                'min-w-[72px] flex-shrink-0',
                                // Vertical padding for touch target (min 44px)
                                'py-1.5 px-1',
                                // Rounded pill shape for active state container
                                'rounded-xl',
                                // Transition
                                'transition-all duration-200',
                                // Active vs inactive
                                isActive
                                    ? 'bg-primary-container text-on-primary-container'
                                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary',
                            ].join(' ')}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {/* Material symbol icon — filled when active */}
                            <span
                                className={`material-symbols-outlined text-[22px] mb-0.5 leading-none ${isActive ? 'text-on-primary-container' : 'text-on-surface-variant'}`}
                                style={{
                                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400",
                                }}
                                aria-hidden="true"
                            >
                                {item.icon}
                            </span>

                            {/* Label */}
                            <span
                                className={`text-[9px] font-label font-semibold uppercase tracking-wider leading-tight text-center whitespace-nowrap ${
                                    isActive ? 'text-on-primary-container' : 'text-on-surface-variant'
                                }`}
                            >
                                {item.mobileLabel || item.navLabel || item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
