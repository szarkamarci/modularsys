import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';
import GetStarted from './pages/GetStarted';
import Audit from './pages/Audit';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Security from './pages/Security';
import Status from './pages/Status';
import Demo from './pages/Demo';
import DemoDashboard from './pages/DemoDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Pages using the common layout (Header + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
          <Route path="/status" element={<Status />} />
        </Route>
        
        {/* Independent Pages */}
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/demo-dashboard" element={<DemoDashboard />} />
        <Route path="/old-demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
