import React, { createContext, useContext, useCallback } from 'react';

type ExportContextType = {
    triggerExport: (type: 'pdf' | 'csv') => void;
    registerExport: (config: any) => void;
};

const ExportContext = createContext<ExportContextType | null>(null);

export function ExportProvider({ children }: { children: React.ReactNode }) {
    const triggerExport = useCallback((type: 'pdf' | 'csv') => {
        console.log(`[Export] Triggered ${type} export (mocked)`);
    }, []);

    const registerExport = useCallback((config: any) => {
        // Mock register
    }, []);

    return (
        <ExportContext.Provider value={{ triggerExport, registerExport }}>
            {children}
        </ExportContext.Provider>
    );
}

export function useExport() {
    const context = useContext(ExportContext);
    if (!context) {
        throw new Error('useExport must be used within an ExportProvider');
    }
    return context;
}
