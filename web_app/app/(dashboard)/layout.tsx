'use client';

import DashboardShell from '../../components/layout/DashboardShell';
import { ExportProvider } from '../../lib/ExportContext';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ExportProvider>
            <DashboardShell>
                {children}
            </DashboardShell>
        </ExportProvider>
    );
}
