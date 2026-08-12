import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BottomNavBar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useTranslation();

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
    <>
      {/* Bottom gradient mask to hide scrolling content behind the gap in Safari */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#faf9fe] to-transparent z-[50] pointer-events-none" />
      
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-[360px] px-4">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-[0px_12px_40px_rgba(87,73,194,0.18)] rounded-full px-4 py-2 border border-white/50 dark:border-slate-700/50 flex items-center justify-between">
        
        {/* Home / Solutions */}
        <a href="/#solutions" className={`relative flex flex-col items-center justify-center flex-1 min-w-[70px] transition-colors ${activeSection === 'solutions' && !isDemo ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400'}`}>
          <span className="material-symbols-outlined text-[22px]" style={activeSection === 'solutions' && !isDemo ? { fontVariationSettings: "'FILL' 1" } : {}}>
            grid_view
          </span>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight truncate w-full text-center">{t('header.solution')}</span>
          {activeSection === 'solutions' && !isDemo && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
          )}
        </a>

        {/* How it works */}
        <a href="/#how-it-works" className={`relative flex flex-col items-center justify-center flex-1 min-w-[70px] transition-colors ${activeSection === 'how-it-works' && !isDemo ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400'}`}>
          <span className="material-symbols-outlined text-[22px]" style={activeSection === 'how-it-works' && !isDemo ? { fontVariationSettings: "'FILL' 1" } : {}}>
            route
          </span>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight truncate w-full text-center">{t('header.how_it_works')}</span>
          {activeSection === 'how-it-works' && !isDemo && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
          )}
        </a>

        {/* Demo */}
        <Link to="/get-started" className={`relative flex flex-col items-center justify-center flex-1 min-w-[70px] transition-colors ${isDemo ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400'}`}>
          <span className="material-symbols-outlined text-[22px]" style={isDemo ? { fontVariationSettings: "'FILL' 1" } : {}}>
            play_circle
          </span>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight truncate w-full text-center">{t('header.demo')}</span>
          {isDemo && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
          )}
        </Link>

        {/* CTA / Contact */}
        <Link to="/audit" className={`relative flex flex-col items-center justify-center flex-1 min-w-[70px] transition-colors ${location.pathname === '/audit' ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400'}`}>
          <span className="material-symbols-outlined text-[22px]" style={location.pathname === '/audit' ? { fontVariationSettings: "'FILL' 1" } : {}}>
            forum
          </span>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight truncate w-full text-center">{t('header.cta')}</span>
          {location.pathname === '/audit' && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
          )}
        </Link>

      </div>
    </>
  );
};

export default BottomNavBar;
