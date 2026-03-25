import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full rounded-t-[3rem] mt-20 bg-surface-container-low dark:bg-slate-950 font-body text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-12 py-12 md:py-16 pb-32 md:pb-16 w-full max-w-7xl mx-auto text-center md:text-left">
        <div className="mb-8 md:mb-0">
          <div className="font-headline font-bold text-on-surface dark:text-white text-2xl mb-2">ModularAI</div>
          <p className="text-on-surface-variant dark:text-slate-500">{t('footer.rights')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link className="text-on-surface-variant dark:text-slate-500 hover:text-primary underline decoration-2 underline-offset-4 transition-all duration-300" to="/privacy">{t('footer.privacy')}</Link>
          <Link className="text-on-surface-variant dark:text-slate-500 hover:text-primary underline decoration-2 underline-offset-4 transition-all duration-300" to="/terms">{t('footer.terms')}</Link>
          <Link className="text-on-surface-variant dark:text-slate-500 hover:text-primary underline decoration-2 underline-offset-4 transition-all duration-300" to="/security">{t('footer.security')}</Link>
          <Link className="text-on-surface-variant dark:text-slate-500 hover:text-primary underline decoration-2 underline-offset-4 transition-all duration-300" to="/status">{t('footer.status')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
