import React from 'react';

interface MetricCardProps {
    iconName: string;
    iconClass?: string;
    iconBgClass?: string;
    title: string;
    value: React.ReactNode;
    subtitle?: React.ReactNode;
    badgeText?: string;
    badgeClass?: string;
    containerClass?: string;
}

export function MetricCard({
    iconName,
    iconClass = 'text-primary',
    iconBgClass = 'bg-primary/10',
    title,
    value,
    subtitle,
    badgeText,
    badgeClass = 'text-on-surface-variant bg-surface-container-low',
    containerClass = 'bg-surface-container-lowest border border-transparent'
}: MetricCardProps) {
    return (
        <div className={`${containerClass} rounded-xl p-5 soft-shadow hover-lift flex flex-col justify-between`}>
            <div className="flex justify-between items-start mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBgClass}`}>
                    <span className={`material-symbols-outlined text-[18px] ${iconClass}`}>{iconName}</span>
                </div>
                {badgeText && (
                    <span className={`text-label-sm font-medium px-2 py-1 rounded-md ${badgeClass}`}>
                        {badgeText}
                    </span>
                )}
            </div>
            <div>
                <p className="text-label-sm text-on-surface-variant mb-0.5 font-label">{title}</p>
                <h3 className="text-xl font-headline font-bold text-on-surface flex items-baseline gap-1">
                    {value}
                    {subtitle && <span className="text-body-sm text-on-surface-variant font-normal ml-1">{subtitle}</span>}
                </h3>
            </div>
        </div>
    );
}
