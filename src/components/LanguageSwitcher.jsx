import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'hu' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-bold text-xs tracking-wider px-3.5 py-2 rounded-full border border-outline-variant/10 shadow-sm transition-all duration-300 active:scale-95"
      aria-label="Toggle Language"
    >
      <span className={`transition-all ${i18n.language === 'en' ? 'text-primary scale-110' : 'opacity-50'}`}>EN</span>
      <span className="opacity-30">|</span>
      <span className={`transition-all ${i18n.language === 'hu' ? 'text-primary scale-110' : 'opacity-50'}`}>HU</span>
    </button>
  );
};

export default LanguageSwitcher;
