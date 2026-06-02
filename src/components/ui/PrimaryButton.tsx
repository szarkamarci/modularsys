import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
}

export function PrimaryButton({ children, isLoading, loadingText = 'Töltés...', className = '', disabled, ...props }: PrimaryButtonProps) {
    return (
        <button
            disabled={isLoading || disabled}
            className={`w-full flex justify-center items-center gap-2 py-3.5 px-6 border border-transparent rounded-full text-[15px] font-headline font-bold text-on-primary bg-gradient-to-br from-primary to-primary-container shadow-[0px_8px_20px_rgba(87,73,194,0.25)] hover:shadow-[0px_12px_28px_rgba(87,73,194,0.35)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 ${className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    {loadingText}
                </>
            ) : children}
        </button>
    );
}
