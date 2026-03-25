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
              alt="Sarah Jenkins" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6NjSVkXoJxpN4KRmI3klb2moVFIqdif_qevcV-Ox1qGXpsSv4tNEQMZUI4ZJ787s0HpAjpXdJ_DX5bljl-nryMZ7jNzlsiSxvbUFNxDpb8i2dXjFqNQxqimDBkKD8y_yzhalLzcZz6y5YJaSyTKZWLsjfccGngtgFSLhSAf2M02PDGGTckLWf7rasRdtpM0Nhpor-WH9x0wHqvoNcNeRp_RDfLaDD1aGK54cEIKVMm4P6kVfJsw_kIGr0aUInRoN-g1XowhvG3vM"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="font-headline font-bold text-on-surface text-lg">{t('testimonial.author', 'Sarah Jenkins')}</p>
            <p className="text-sm font-medium text-on-surface-variant uppercase tracking-widest">{t('testimonial.role', 'COO, Velocity Retail')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
