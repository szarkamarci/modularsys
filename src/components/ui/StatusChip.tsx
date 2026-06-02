import React from 'react';

interface StatusChipProps {
    label: string;
    value: React.ReactNode;
    bgClass?: string;
    textClass?: string;
    numClass?: string;
    className?: string;
}

export function StatusChip({ 
    label, 
    value, 
    bgClass = 'bg-surface-container-highest', 
    textClass = 'text-on-surface-variant', 
    numClass = 'text-on-surface',
    className = '' 
}: StatusChipProps) {
    return (
        <div className={`px-5 py-2 rounded-full ${bgClass} flex items-center gap-3 ${className}`}>
            <span className={`text-sm font-label font-bold ${textClass} tracking-wide uppercase`}>{label}</span>
            <span className={`text-lg font-headline font-black ${numClass}`}>{value}</span>
        </div>
    );
}
