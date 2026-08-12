import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 500) {
        setActiveSection('home');
      } else if (scrollY < 1800) {
        setActiveSection('solutions');
      } else if (scrollY < 3000) {
        setActiveSection('how-it-works');
      } else {
        setActiveSection('cta');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDemo = location.pathname.startsWith('/get-started');

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-[0px_12px_40px_rgba(87,73,194,0.18)] rounded-full px-7 py-3 border border-white/50 dark:border-slate-700/50 flex items-center gap-9">
        
        {/* Home / Solutions */}
        <a href="/#solutions" className="relative flex flex-col items-center group">
          <span className={`material-symbols-outlined transition-colors ${activeSection === 'solutions' && !isDemo ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400'}`} style={activeSection === 'solutions' && !isDemo ? { fontVariationSettings: "'FILL' 1" } : {}}>
            space_dashboard
          </span>
          {activeSection === 'solutions' && !isDemo && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
          )}
        </a>

        {/* How it works */}
        <a href="/#how-it-works" className="relative flex flex-col items-center group">
          <span className={`material-symbols-outlined transition-colors ${activeSection === 'how-it-works' && !isDemo ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400'}`} style={activeSection === 'how-it-works' && !isDemo ? { fontVariationSettings: "'FILL' 1" } : {}}>
            inventory_2
          </span>
          {activeSection === 'how-it-works' && !isDemo && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
          )}
        </a>

        {/* Demo */}
        <Link to="/get-started" className="relative flex flex-col items-center group">
          <span className={`material-symbols-outlined transition-colors ${isDemo ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400'}`}>
            search
          </span>
          {isDemo && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
          )}
        </Link>

        {/* CTA / Contact */}
        <Link to="/audit" className="relative flex flex-col items-center group">
          <span className={`material-symbols-outlined transition-colors ${location.pathname === '/audit' ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400'}`}>
            more_horiz
          </span>
          {location.pathname === '/audit' && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
          )}
        </Link>

      </div>
    </div>
  );
};

export default BottomNavBar;
