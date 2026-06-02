import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconName?: string;
}

export function SecondaryButton({ children, iconName, className = '', ...props }: SecondaryButtonProps) {
    return (
        <button
            className={`w-full flex justify-center items-center gap-2 py-3 px-6 border border-outline-variant/30 rounded-full text-sm font-label font-bold text-on-surface hover:bg-surface-container-highest hover:border-outline-variant/50 transition-colors bg-surface-container-lowest/50 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {iconName && <span className="material-symbols-outlined text-[18px]">{iconName}</span>}
            {children}
        </button>
    );
}
