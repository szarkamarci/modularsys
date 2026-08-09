import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CTA = () => {
  const { t } = useTranslation();
  
  return (
    <section id="audit" className="max-w-5xl mx-auto px-4 md:px-8 mb-24 md:mb-40 text-center scroll-mt-24">
      <div className="bg-primary p-10 md:p-20 rounded-2xl md:rounded-xl relative overflow-hidden shadow-xl shadow-primary/10">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/40 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-5 md:mb-6 tracking-tight">{t('cta.title')}</h2>
          <p className="text-primary-fixed text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto opacity-90 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <Link to="/audit" className="inline-block bg-white text-primary px-8 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-primary-fixed transition-colors active:scale-95 duration-200">
            {t('cta.button')}
          </Link>
          <p className="text-white/60 text-xs md:text-sm mt-6 font-medium">{t('cta.disclaimer')}</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
