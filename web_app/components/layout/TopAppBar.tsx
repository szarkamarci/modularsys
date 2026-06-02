'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getRouteConfigMap, getScenarioConfig } from '../../lib/scenarios/scenarioRegistry';
import { useLocale } from '../../lib/locales/LocaleProvider';

// ─── Type helpers ─────────────────────────────────────────────────────────────
type NavPage = {
    label: string;     
    href: string;
    icon: string;      
    keywords: string[]; 
};

function getUsername(): string {
    return 'Demo Felhasználó';
}

export default function TopAppBar() {
    const router = useRouter();
    const client = getCurrentClient();
    const { locale, localeConfig, setLocale, supportedLocales } = useLocale();
    const scenario = getScenarioConfig(client.scenarioId, locale);
    const routeConfigMap = getRouteConfigMap(scenario);

    const [profileOpen, setProfileOpen] = useState(false);
    const [username, setUsername] = useState('Felhasználó');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    
    const searchRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const activePages = client.enabledRoutes
        .map((route): NavPage | undefined => {
            const routeConfig = routeConfigMap.get(route);
            if (!routeConfig) return undefined;
            return {
                label: routeConfig.navLabel || routeConfig.label,
                href: routeConfig.href,
                icon: routeConfig.icon,
                keywords: routeConfig.keywords,
            };
        })
        .filter((page): page is NavPage => Boolean(page));

    const filteredPages = activePages.filter(page => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            page.label.toLowerCase().includes(q) ||
            page.keywords.some(k => k.includes(q))
        );
    });

    useEffect(() => {
        setUsername(localeConfig.topBar.userName || getUsername());
    }, [localeConfig.topBar.userName]);

    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    const handleNavSelect = (href: string) => {
        setSearchOpen(false);
        setSearchQuery('');
        router.push(href);
    };

    const initials = username.slice(0, 2).toUpperCase();
    const isOverlayOpen = searchOpen || profileOpen;

    return (
        <>
            {isOverlayOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => {
                        setSearchOpen(false);
                        setProfileOpen(false);
                    }}
                />
            )}
            <header className={`bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 sticky top-0 flex items-center justify-between px-8 py-4 flex-shrink-0 transition-all ${isOverlayOpen ? 'z-50' : 'z-20'}`}>
            <div className="flex items-center gap-6 flex-1">
                <div className="flex items-center gap-2 md:hidden">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-container rounded-lg text-on-primary font-bold text-sm">
                        {client.logoText || client.brandLabel.charAt(0)}
                    </div>
                    <span className="text-xl font-bold text-on-surface font-headline tracking-wide">{client.brandLabel}</span>
                </div>

                <div className="hidden md:flex items-center max-w-md w-full" ref={searchRef}>
                    <div className="relative w-full">
                        <div className={`flex items-center px-4 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/20 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all ${searchOpen ? 'ring-2 ring-primary/20 border-primary/50 bg-surface-container-lowest relative z-50' : ''}`}>
                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant/70 flex-shrink-0">search</span>
                            <input
                                type="text"
                                placeholder={localeConfig.topBar.searchPlaceholder}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchOpen(true)}
                                onKeyDown={e => {
                                    if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); }
                                    if (e.key === 'Enter' && filteredPages.length > 0) {
                                        handleNavSelect(filteredPages[0].href);
                                    }
                                }}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-body text-on-surface placeholder:text-on-surface-variant/50 px-3 outline-none"
                            />
                        </div>

                        {searchOpen && (
                            <div className="absolute top-full mt-2 left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-xl rounded-xl ambient-shadow border border-outline-variant/20 z-[60] overflow-hidden">
                                <div className="px-4 pt-3 pb-2 border-b border-outline-variant/10">
                                    <p className="text-[10px] uppercase tracking-wider font-label text-primary font-bold">
                                        {searchQuery.trim() ? localeConfig.topBar.resultsLabel : localeConfig.topBar.pagesLabel}
                                    </p>
                                </div>
                                {filteredPages.length > 0 ? (
                                    <div className="py-2 px-2">
                                        {filteredPages.map(page => (
                                            <button
                                                key={page.href}
                                                onMouseDown={e => e.preventDefault()}
                                                onClick={() => handleNavSelect(page.href)}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-on-surface hover:bg-surface-container-high transition-colors text-left group"
                                            >
                                                <span className="w-8 h-8 rounded-md bg-primary-container/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-container/40">
                                                    <span className="material-symbols-outlined text-[18px] text-primary">{page.icon}</span>
                                                </span>
                                                <span className="font-medium">{page.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-4 py-4 text-sm text-on-surface-variant italic">{localeConfig.topBar.noResults}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center rounded-full bg-surface-container-low border border-outline-variant/20 p-1">
                    {supportedLocales.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setLocale(option)}
                            className={`px-3 py-1.5 rounded-full text-xs font-label font-black transition-colors ${
                                locale === option
                                    ? 'bg-primary text-on-primary shadow-sm'
                                    : 'text-on-surface-variant hover:text-primary'
                            }`}
                            aria-pressed={locale === option}
                        >
                            {option.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div ref={profileRef} className="relative flex items-center gap-2 ml-2 pl-4 border-l border-outline-variant/20">
                    <button
                        onClick={() => setProfileOpen((prev) => !prev)}
                        className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-sm font-bold font-headline text-on-primary hover:shadow-[0px_4px_12px_rgba(87,73,194,0.3)] transition-all flex-shrink-0 ${profileOpen ? 'relative z-50' : ''}`}
                    >
                        {initials}
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 top-full mt-3 w-60 bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl ambient-shadow border border-outline-variant/20 z-[60] overflow-hidden">
                            <div className="px-5 py-4 border-b border-outline-variant/10 bg-surface-container-lowest/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-sm font-bold text-on-primary flex-shrink-0 shadow-sm">
                                        {initials}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-on-surface font-headline truncate leading-tight">{username}</p>
                                        <p className="text-[10px] text-primary font-label font-bold uppercase tracking-widest mt-0.5">{client.displayName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 space-y-1">
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-error hover:bg-error-container/50 transition-colors text-left">
                                    <span className="material-symbols-outlined text-[18px]">logout</span>
                                    {localeConfig.topBar.logout}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
        </>
    );
}
