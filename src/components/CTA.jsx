import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-8 mb-24 md:mb-40 text-center">
      <div className="bg-primary p-10 md:p-20 rounded-2xl md:rounded-xl relative overflow-hidden shadow-xl shadow-primary/10">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/40 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-6 md:mb-8 tracking-tight">{t('cta.title')}</h2>
          <p className="text-primary-fixed text-lg md:text-xl mb-10 md:mb-12 max-w-xl mx-auto opacity-90 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <button className="w-full md:w-auto bg-white text-primary px-10 py-4 md:py-5 rounded-xl md:rounded-full font-extrabold text-lg md:text-xl hover:bg-primary-fixed transition-colors active:scale-95 duration-200">
            {t('cta.button')}
          </button>
          <p className="text-white/60 text-xs md:text-sm mt-8 font-medium">{t('cta.disclaimer')}</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
