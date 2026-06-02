import React from 'react';

interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    iconName?: string;
    label?: string;
}

export function PremiumInput({ iconName, label, id, className = '', ...props }: PremiumInputProps) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="block font-label text-[13px] font-semibold tracking-wide text-on-surface-variant/80 ml-2" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative group">
                {iconName && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant/60 group-focus-within:text-primary transition-colors duration-300 pointer-events-none z-10">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>{iconName}</span>
                    </span>
                )}
                <input
                    id={id}
                    className={`block w-full ${iconName ? 'pl-11' : 'pl-4'} pr-4 py-3.5 bg-surface/40 backdrop-blur-sm border border-outline-variant/20 rounded-2xl text-on-surface text-sm font-body focus:bg-surface-container-lowest focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none disabled:opacity-50 shadow-[0px_2px_10px_rgba(0,0,0,0.02)] hover:bg-surface/60`}
                    {...props}
                />
            </div>
        </div>
    );
}
