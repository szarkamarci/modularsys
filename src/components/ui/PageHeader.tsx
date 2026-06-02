import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    className?: string;
}

export function PageHeader({ title, description, className = 'mb-8 max-w-5xl' }: PageHeaderProps) {
    return (
        <div className={className}>
            <h1 className="text-2xl md:text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">
                {title}
            </h1>
            {description && (
                <p className="text-body-md md:text-body-lg text-on-surface-variant">
                    {description}
                </p>
            )}
        </div>
    );
}
