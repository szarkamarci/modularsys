import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';
import BlogPost from './pages/BlogPost';
import GetStarted from './pages/GetStarted';
import Audit from './pages/Audit';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Security from './pages/Security';
import Status from './pages/Status';
import Demo from './pages/Demo';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import OverviewPage from './features/overview/OverviewPage';
import InventoryPage from './features/inventory/InventoryPage';
import FrequentItemsPage from './features/frequent-items/FrequentItemsPage';
import InsightsPage from './features/insights/InsightsPage';
import SearchAnalyticsPage from './features/search-analytics/SearchAnalyticsPage';
import WatchlistPage from './features/watchlist/WatchlistPage';
import { LocaleProvider } from './lib/locales/LocaleProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <LocaleProvider>
      <ScrollToTop />
      <Routes>
        {/* Pages using the common layout (Header + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<BlogPost />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
          <Route path="/status" element={<Status />} />
        </Route>
        
        {/* Dashboard Pages */}
        <Route path="/demo-dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="frequent-items" element={<FrequentItemsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="search-analytics" element={<SearchAnalyticsPage />} />
          <Route path="watchlist" element={<WatchlistPage />} />
        </Route>
        <Route path="/demo-dashboard/scenario/:scenarioId" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
        </Route>

        {/* Independent Pages */}
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/old-demo" element={<Demo />} />
      </Routes>
      </LocaleProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
