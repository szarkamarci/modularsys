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
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl ${scrolled ? 'shadow-[0px_20px_40px_rgba(87,73,194,0.06)]' : ''}`}>
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto font-headline antialiased">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 z-50">
              <img src="/assets/brand/wordmark.svg" alt="ModularAI" className="h-14 w-auto" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="/#solutions" className="font-semibold transition-colors duration-300 text-on-surface-variant dark:text-slate-400 hover:text-primary">{t('header.solution')}</a>
            <a href="/#how-it-works" className="font-semibold transition-colors duration-300 text-on-surface-variant dark:text-slate-400 hover:text-primary">{t('header.how_it_works')}</a>
            <Link to="/demo-dashboard" className={`font-semibold transition-colors duration-300 ${location.pathname.startsWith('/demo-dashboard') ? 'text-primary' : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'}`}>{t('header.demo')}</Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/audit" className="hidden sm:block bg-primary text-white px-5 py-2 rounded-full font-semibold active:scale-95 duration-200 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap text-sm">
              {t('header.cta')}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
