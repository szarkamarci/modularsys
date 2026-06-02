import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import { ExportProvider } from '../../lib/ExportContext';

export default function DashboardLayout() {
    return (
        <ExportProvider>
            <DashboardShell>
                <Outlet />
            </DashboardShell>
        </ExportProvider>
    );
}
