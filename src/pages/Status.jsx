import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Status = () => {
  const { i18n } = useTranslation();
  const isHu = i18n.language === 'hu';
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    // Spooky simulated jitter
    const interval = setInterval(() => {
        setLatency(prev => Math.max(12, Math.min(80, prev + (Math.random() > 0.5 ? 4 : -4))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto font-body text-on-surface-variant">
      
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">
            {isHu ? "Rendszer Státusz" : "System Status"}
            </h1>
            <p className="text-lg text-on-surface-variant">
                {isHu ? "Valós idejű hálózati és API állapot" : "Real-time network and API operational health"}
            </p>
        </div>

        <div className="bg-green-100/50 border border-green-200 text-green-800 px-6 py-3 rounded-xl flex items-center gap-3 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
            </span>
            <span className="font-bold text-sm uppercase tracking-widest">{isHu ? "Minden Rendszer Működik" : "All Systems Operational"}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Core Node */}
        <div className="bg-surface-container-lowest glass-card rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h3 className="font-headline font-bold text-xl text-on-surface">Data Ingestion API</h3>
                <p className="text-sm">eu-central-1 (Frankfurt)</p>
            </div>
            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                    <p className="text-2xl font-bold font-mono text-on-surface">{latency}ms</p>
                    <p className="text-xs uppercase font-bold tracking-wider text-on-surface-variant/70">Latency</p>
                </div>
                <div className="text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg">Operational</div>
            </div>
        </div>

        {/* Prediction Engine Node */}
        <div className="bg-surface-container-lowest glass-card rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h3 className="font-headline font-bold text-xl text-on-surface">Predictive Engine Layer</h3>
                <p className="text-sm">eu-central-1 (Frankfurt)</p>
            </div>
            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                    <p className="text-2xl font-bold font-mono text-on-surface">99.99%</p>
                    <p className="text-xs uppercase font-bold tracking-wider text-on-surface-variant/70">Uptime</p>
                </div>
                <div className="text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg">Operational</div>
            </div>
        </div>

        {/* Caching Node */}
        <div className="bg-surface-container-lowest glass-card rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h3 className="font-headline font-bold text-xl text-on-surface">Global Edge CDN</h3>
                <p className="text-sm">Multiple Regions</p>
            </div>
            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                    <p className="text-2xl font-bold font-mono text-on-surface">12ms</p>
                    <p className="text-xs uppercase font-bold tracking-wider text-on-surface-variant/70">Latency</p>
                </div>
                <div className="text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg">Operational</div>
            </div>
        </div>

      </div>
    </main>
  );
};

export default Status;
