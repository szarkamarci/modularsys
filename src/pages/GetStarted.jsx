import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay for mock login
        setTimeout(() => {
            setIsLoading(false);
            navigate('/demo-dashboard');
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden font-body">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="bg-surface-container-lowest/80 backdrop-blur-3xl rounded-[2rem] p-10 shadow-[0px_20px_40px_rgba(87,73,194,0.06)] border border-outline-variant/20">
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="w-14 h-14 mb-4 flex items-center justify-center">
                            <img src="/assets/brand/mark.svg" alt="ModularAI" className="w-full h-full drop-shadow-sm" />
                        </div>
                        <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">Demo Platform</h1>
                        <p className="text-on-surface-variant font-medium mt-2 text-sm">Experience the ModularAI predictive engine in action.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <input
                                    type="email"
                                    defaultValue="demo@modularai.com"
                                    className="w-full bg-surface-container-low text-on-surface px-5 py-3.5 rounded-xl border border-outline-variant/20 focus:bg-surface-container-lowest focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body text-sm placeholder:text-on-surface-variant/50"
                                    placeholder="Work Email"
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    type="password"
                                    defaultValue="predictive123"
                                    className="w-full bg-surface-container-low text-on-surface px-5 py-3.5 rounded-xl border border-outline-variant/20 focus:bg-surface-container-lowest focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body text-sm placeholder:text-on-surface-variant/50"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-3.5 rounded-xl hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 transition-transform shadow-xl shadow-primary/20 flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                                    <span>Entering Sandbox...</span>
                                </>
                            ) : (
                                <span>Enter Demo</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[11px] text-on-surface-variant/70 font-label uppercase tracking-wider font-bold">
                            Frontend-only Sandbox.
                        </p>
                    </div>
                </div>
                
                <div className="mt-8 text-center">
                  <button onClick={() => navigate('/')} className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to ModularAI
                  </button>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
