import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNavBar from './BottomNavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body selection:bg-primary-fixed">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default Layout;
