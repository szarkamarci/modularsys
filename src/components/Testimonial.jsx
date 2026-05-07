import { useTranslation } from 'react-i18next';

const Testimonial = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-40 text-center md:text-left">
      <div className="relative max-w-3xl mx-auto md:mx-0">
        <span className="absolute -top-6 -left-2 text-6xl text-primary/10 font-headline pointer-events-none">“</span>
        <p className="text-xl md:text-3xl font-medium text-on-surface leading-snug italic relative z-10">
          {t('testimonial.quote', '"ModularAI didn\'t just organize our data; it gave our team their weekends back."')}
        </p>
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center md:justify-start">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-surface-container-high shadow-lg flex items-center justify-center border-2 border-primary/20">
            <span className="text-3xl font-headline font-bold text-primary" aria-label="Cortos representative avatar">P</span>
          </div>
          <div className="text-center md:text-left">
            <p className="font-headline font-bold text-on-surface text-lg">{t('testimonial.author')}</p>
            <p className="text-sm font-medium text-on-surface-variant uppercase tracking-widest">{t('testimonial.role')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
