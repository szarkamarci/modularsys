import React from 'react';

interface StatusBadgeProps {
    label: string;
    badgeClass?: string; // e.g. "bg-[#ffdad6] text-[#93000a]"
    dotClass?: string;   // e.g. "bg-error"
    className?: string;
}

export function StatusBadge({ label, badgeClass = 'bg-[#e3e2e7] text-[#474553]', dotClass = 'bg-outline', className = '' }: StatusBadgeProps) {
    return (
        <span className={`${badgeClass} px-3 py-1 rounded-full text-label-sm font-bold flex items-center gap-1.5 w-max ${className}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></div>
            {label}
        </span>
    );
}
