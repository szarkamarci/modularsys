'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay for mock login
        setTimeout(() => {
            setIsLoading(false);
            router.push('/inventory');
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="bg-surface-container-lowest/80 backdrop-blur-3xl rounded-[2rem] p-10 ambient-shadow border border-outline-variant/20">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-2xl flex items-center justify-center shadow-sm mb-4">
                            <span className="text-on-primary font-bold text-2xl font-headline tracking-tighter">DP</span>
                        </div>
                        <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">DemoPlatform</h1>
                        <p className="text-on-surface-variant font-medium mt-2">Kérjük, jelentkezzen be a folytatáshoz</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <input
                                    type="email"
                                    defaultValue="demo@modularai.com"
                                    className="w-full bg-surface-container-low text-on-surface px-5 py-3.5 rounded-xl border border-outline-variant/20 focus:bg-surface-container-lowest focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body text-sm placeholder:text-on-surface-variant/50"
                                    placeholder="E-mail cím"
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    type="password"
                                    defaultValue="password123"
                                    className="w-full bg-surface-container-low text-on-surface px-5 py-3.5 rounded-xl border border-outline-variant/20 focus:bg-surface-container-lowest focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body text-sm placeholder:text-on-surface-variant/50"
                                    placeholder="Jelszó"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-3.5 rounded-xl hover-lift disabled:opacity-70 disabled:hover:transform-none disabled:hover:shadow-none flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                                    <span>Bejelentkezés folyamatban...</span>
                                </>
                            ) : (
                                <span>Bejelentkezés</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-on-surface-variant/70 font-label">
                            Ez egy demonstrációs felület. Használja a kitöltött adatokat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
