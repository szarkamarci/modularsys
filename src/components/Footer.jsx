import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full rounded-t-[3rem] mt-20 bg-surface-container-low dark:bg-slate-950 font-body text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-7xl mx-auto">
        <div className="mb-8 md:mb-0">
          <div className="font-headline font-bold text-on-surface dark:text-white text-2xl mb-2">ModularAI</div>
          <p className="text-on-surface-variant dark:text-slate-500">{t('footer.rights')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-on-surface-variant dark:text-slate-500 hover:text-primary underline decoration-2 underline-offset-4 transition-all duration-300" href="#">{t('footer.privacy')}</a>
          <a className="text-on-surface-variant dark:text-slate-500 hover:text-primary underline decoration-2 underline-offset-4 transition-all duration-300" href="#">{t('footer.terms')}</a>
          <a className="text-on-surface-variant dark:text-slate-500 hover:text-primary underline decoration-2 underline-offset-4 transition-all duration-300" href="#">{t('footer.security')}</a>
          <a className="text-on-surface-variant dark:text-slate-500 hover:text-primary underline decoration-2 underline-offset-4 transition-all duration-300" href="#">{t('footer.status')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
