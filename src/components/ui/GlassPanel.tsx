import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'login';
}

export function GlassPanel({ children, className = '', variant = 'default', ...props }: GlassPanelProps) {
    if (variant === 'login') {
        return (
            <div 
                className={`glass-panel rounded-[2rem] p-10 shadow-[0px_30px_60px_rgba(87,73,194,0.08)] border border-white/40 dark:border-outline-variant/10 relative overflow-hidden bg-surface-container-lowest/80 ${className}`}
                {...props}
            >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                {children}
            </div>
        );
    }

    return (
        <div 
            className={`bg-surface-container-lowest rounded-[2rem] p-6 md:p-8 shadow-[0_10px_40px_-10px_rgba(87,73,194,0.08)] relative ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
