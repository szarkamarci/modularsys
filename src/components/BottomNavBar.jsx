import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname;

  const getStyle = (target) => {
    if (path === target) {
      return "flex flex-col items-center justify-center bg-surface-container-low text-primary rounded-full p-3 w-16";
    }
    return "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors p-3 opacity-80 w-16";
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl flex justify-around items-center px-4 pb-6 pt-2 rounded-t-[3rem] shadow-[0px_-10px_30px_rgba(132,119,242,0.08)]">
      <Link to="/" className={getStyle('/')}>
        <span className="material-symbols-outlined" style={path === '/' ? { fontVariationSettings: "'FILL' 1" } : {}}>home_max</span>
        <span className="text-[10px] font-bold mt-1">{t('bottom_nav.home')}</span>
      </Link>
      
      <Link to="/pricing" className={getStyle('/pricing')}>
        <span className="material-symbols-outlined" style={path === '/pricing' ? { fontVariationSettings: "'FILL' 1" } : {}}>insights</span>
        <span className="text-[10px] font-bold mt-1">{t('bottom_nav.pricing')}</span>
      </Link>
      
      <Link to="/resources" className={getStyle('/resources')}>
        <span className="material-symbols-outlined" style={path === '/resources' ? { fontVariationSettings: "'FILL' 1" } : {}}>folder</span>
        <span className="text-[10px] font-bold mt-1">{t('bottom_nav.resources')}</span>
      </Link>
      
      <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors p-3 opacity-80 cursor-pointer w-16">
        <span className="material-symbols-outlined">settings</span>
        <span className="text-[10px] font-bold mt-1">{t('bottom_nav.settings')}</span>
      </div>
    </nav>
  );
};

export default BottomNavBar;
