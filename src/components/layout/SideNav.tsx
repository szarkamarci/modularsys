
import { Link, useLocation } from 'react-router-dom';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getRouteConfigMap, getScenarioConfig } from '../../lib/scenarios/scenarioRegistry';
import { ScenarioRouteConfig } from '../../features/overview/types';
import { useLocale } from '../../lib/locales/LocaleProvider';

export default function SideNav() {
    const { pathname } = useLocation();
    const client = getCurrentClient();
    const { locale } = useLocale();
    const scenario = getScenarioConfig(client.scenarioId, locale);
    const routeConfigMap = getRouteConfigMap(scenario);

    const navItems = client.enabledRoutes
        .map(route => routeConfigMap.get(route))
        .filter((item): item is ScenarioRouteConfig => Boolean(item));

    return (
        <nav className="hidden md:flex flex-col bg-surface-container-low w-64 h-screen border-r border-outline-variant/20 flex-shrink-0 z-30">
            {/* Brand Header — official ModularAI wordmark */}
            <div className="px-5 py-5 border-b border-outline-variant/10 flex-shrink-0">
                <Link to="/" className="inline-block">
                    <img
                        src="/assets/brand/wordmark.svg"
                        alt="ModularAI"
                        className="h-14 w-auto"
                    />
                </Link>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
                {navItems.map((item) => {
                    // Exact match for overview, prefix match for sub-routes
                    const isActive =
                        item.href === '/demo-dashboard'
                            ? pathname === '/demo-dashboard'
                            : pathname.startsWith(item.href);

                    if (isActive) {
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 bg-primary-container/40 text-on-primary-container border-r-4 border-primary rounded-l-none rounded-r-full transition-transform duration-200 translate-x-1 group"
                            >
                                <span
                                    className="material-symbols-outlined text-xl fill-icon text-primary transition-transform group-hover:scale-110"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    {item.icon}
                                </span>
                                <span className="text-sm font-label font-bold text-primary">
                                    {item.navLabel || item.label}
                                </span>
                            </Link>
                        );
                    }
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all duration-300 group"
                        >
                            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">
                                {item.icon}
                            </span>
                            <span className="text-sm font-label font-medium">
                                {item.navLabel || item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
