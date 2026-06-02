import React from 'react';

export interface TimeRangeOption {
    label: string;
    value: string;
}

interface TimeRangeSelectorProps {
    options: TimeRangeOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function TimeRangeSelector({
    options,
    value,
    onChange,
    className = ''
}: TimeRangeSelectorProps) {
    return (
        <div className={`inline-flex flex-nowrap gap-1 p-1 bg-surface-container-low rounded-2xl md:rounded-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}>
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl md:rounded-full text-xs sm:text-label-md font-label transition-colors whitespace-nowrap shrink-0 flex-1 sm:flex-none ${
                        value === option.value
                            ? 'bg-surface-container-lowest shadow-sm font-bold text-primary'
                            : 'font-medium text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
