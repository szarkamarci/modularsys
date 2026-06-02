
import SideNav from './SideNav';
import TopAppBar from './TopAppBar';
import BottomNav from './BottomNav';

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
            {/*
                Left Sidebar — desktop only.
                SideNav itself is `hidden md:flex` so it self-hides on mobile.
            */}
            <SideNav />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <TopAppBar />

                {/*
                    Scrollable page content.
                    On mobile: pb-24 reserves space so content is not hidden
                    behind the fixed BottomNav (approx 80px bar + safe area).
                    On md+: pb-0 resets — BottomNav is hidden so no padding needed.
                */}
                <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 md:px-8 md:py-8">
                    {children}
                </main>
            </div>

            {/* Mobile bottom navigation — hidden on md+ */}
            <BottomNav />
        </div>
    );
}
