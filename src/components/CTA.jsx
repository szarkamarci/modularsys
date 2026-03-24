import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="max-w-5xl mx-auto px-8 mb-40 text-center">
      <div className="bg-primary p-20 rounded-xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/40 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white mb-8">{t('cta.title')}</h2>
          <p className="text-primary-fixed text-xl mb-12 max-w-xl mx-auto opacity-90">
            {t('cta.subtitle')}
          </p>
          <button className="bg-white text-primary px-10 py-5 rounded-full font-extrabold text-xl hover:bg-primary-fixed transition-colors active:scale-95 duration-200">
            {t('cta.button')}
          </button>
          <p className="text-white/60 text-sm mt-8 font-medium">{t('cta.disclaimer')}</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
