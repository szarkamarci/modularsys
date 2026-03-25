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
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-surface-container-high shadow-lg">
            <img
              className="w-full h-full object-cover"
              alt="Cortos CEO"
              src="https://static.wixstatic.com/media/16d4a5_ba86d322774d4a3cab8f161d8f4a1179~mv2.png/v1/fill/w_322,h_178,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Porots%20log%C3%B31.png"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="font-headline font-bold text-on-surface text-lg">{t('testimonial.author', 'Nagy Csaba')}</p>
            <p className="text-sm font-medium text-on-surface-variant uppercase tracking-widest">{t('testimonial.role', 'HUNGARY, Cortos CEO')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
