import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl ${scrolled ? 'shadow-[0px_20px_40px_rgba(87,73,194,0.06)]' : ''}`}>
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto font-headline antialiased">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/favico_up.png" alt="ModularAI Logo" className="h-8 w-auto rounded opacity-90" />
          <div className="text-2xl font-bold tracking-tight text-on-surface dark:text-white">ModularAI</div>
        </Link>
        <div className="hidden md:flex items-center gap-12">
          <a className="text-[#8477F2] font-semibold transition-colors duration-300" href="#">{t('header.features')}</a>
          <Link to="/pricing" className={`font-semibold transition-colors duration-300 ${location.pathname === '/pricing' ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'}`}>
            {t('header.pricing')}
          </Link>
          <Link to="/resources" className={`font-semibold transition-colors duration-300 ${location.pathname === '/resources' ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'}`}>
            {t('header.resources')}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button className="hidden sm:block bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-full font-semibold active:scale-95 duration-200 transition-all hover:shadow-lg hover:shadow-primary/20">
            {t('header.cta')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
