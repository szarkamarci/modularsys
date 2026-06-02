import React from 'react';
import { useNavigate } from 'react-router-dom';

const DemoDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-surface font-body text-on-surface">
            {/* Top Navigation */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#faf9fe]/70 backdrop-blur-xl border-b border-surface-container-high flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <span className="material-symbols-outlined text-primary">arrow_back</span>
                    <img src="/assets/brand/wordmark.svg" alt="ModularAI" className="h-6 w-auto" />
                    <span className="text-sm font-normal text-on-surface-variant border-l border-outline-variant pl-3">Demo Sandbox</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-on-primary-fixed shadow-sm">
                        U
                    </div>
                </div>
            </header>

            <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Sandbox Environment</p>
                        <h1 className="text-3xl md:text-4xl font-headline font-black text-on-surface tracking-tight">Executive Overview</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-surface-container-low rounded-lg font-bold text-sm hover:bg-surface-container-high transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">download</span> Export Report
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-md hover:scale-105 transition-transform flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">add</span> Add Module
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* KPI 1 */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
                            </div>
                            <span className="bg-[#dff7e7] text-[#1d6b3a] px-2 py-1 rounded-full text-[10px] font-bold">Optimal</span>
                        </div>
                        <p className="text-sm text-on-surface-variant font-medium mb-1">Inventory Health</p>
                        <h3 className="text-3xl font-headline font-black text-on-surface tracking-tight">94.2%</h3>
                        <p className="text-xs text-on-surface-variant mt-2">+2.4% from last week</p>
                    </div>

                    {/* KPI 2 */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-error-container/60 text-error flex items-center justify-center">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
                            </div>
                            <span className="bg-error-container text-on-error-container px-2 py-1 rounded-full text-[10px] font-bold">Critical</span>
                        </div>
                        <p className="text-sm text-on-surface-variant font-medium mb-1">Predicted Churn</p>
                        <h3 className="text-3xl font-headline font-black text-on-surface tracking-tight">3 accounts</h3>
                        <p className="text-xs text-on-surface-variant mt-2">Action required within 48h</p>
                    </div>

                    {/* KPI 3 */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#fff4cf] text-[#9a6100] flex items-center justify-center">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                            </div>
                            <span className="bg-[#fff4cf] text-[#9a6100] px-2 py-1 rounded-full text-[10px] font-bold">Action Suggested</span>
                        </div>
                        <p className="text-sm text-on-surface-variant font-medium mb-1">Procurement Target</p>
                        <h3 className="text-3xl font-headline font-black text-on-surface tracking-tight">+577 units</h3>
                        <p className="text-xs text-on-surface-variant mt-2">Based on predictive trend</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent AI Recommendations */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
                        <h2 className="text-lg font-headline font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            AI Recommendations
                        </h2>
                        <div className="space-y-4">
                            <div className="p-5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm text-on-surface">Restock 'Pro Widget'</h4>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-error-container text-on-error-container rounded-full">High Urgency</span>
                                </div>
                                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">Anomaly detected: Demand is spiking 40% faster than historical average.</p>
                                <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                    Review Data <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </button>
                            </div>
                            <div className="p-5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm text-on-surface">Cross-sell Opportunity</h4>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#fff4cf] text-[#9a6100] rounded-full">Medium</span>
                                </div>
                                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">Users buying 'Starter Kit' have a 78% likelihood to purchase 'Extended Support'.</p>
                                <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                    Review Data <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Simple Chart / Data Vis mock */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 flex flex-col">
                        <h2 className="text-lg font-headline font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">timeline</span>
                            Stock Forecast Trend
                        </h2>
                        <div className="flex-1 bg-surface-container-low rounded-xl border border-outline-variant/10 flex items-center justify-center relative overflow-hidden min-h-[250px]">
                             <svg className="w-full h-full absolute bottom-0" preserveAspectRatio="none" viewBox="0 0 800 200">
                              <defs>
                                <linearGradient id="gradientLine" x1="0%" x2="100%" y1="0%" y2="0%">
                                  <stop offset="0%" stopColor="#8477F2" stopOpacity="0.1"></stop>
                                  <stop offset="50%" stopColor="#8477F2" stopOpacity="1"></stop>
                                  <stop offset="100%" stopColor="#8477F2" stopOpacity="0.1"></stop>
                                </linearGradient>
                              </defs>
                              <path d="M0,180 C100,160 200,180 300,120 C400,140 500,40 600,60 C700,90 800,50 800,50" fill="none" stroke="url(#gradientLine)" strokeLinecap="round" strokeWidth="4"></path>
                              <circle cx="600" cy="60" fill="#8477F2" r="6"></circle>
                              <circle cx="600" cy="60" fill="#8477F2" fillOpacity="0.2" r="12"></circle>
                            </svg>
                            <div className="absolute top-[20%] left-[65%] bg-white p-3 shadow-lg rounded-lg border border-outline-variant/10 min-w-[120px]">
                                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Projected Peak</p>
                                <p className="text-base font-black text-primary">+12% Demand</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DemoDashboard;
