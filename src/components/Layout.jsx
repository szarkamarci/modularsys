import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNavBar from './BottomNavBar';
import PipelineBackground from './PipelineBackground';

const Layout = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body selection:bg-primary-fixed relative">
      <PipelineBackground />
      <Header />
      <div className="flex-grow relative z-[1]">
        <Outlet />
      </div>
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default Layout;
