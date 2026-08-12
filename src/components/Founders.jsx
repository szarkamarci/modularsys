import { useTranslation } from 'react-i18next';

const Founders = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="max-w-7xl mx-auto px-4 md:px-8 mb-24 md:mb-32 scroll-mt-24">
      <div className="border-t border-outline-variant/20 pt-12 md:pt-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4">
              {t('founders.title')}
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              {t('founders.desc')}
            </p>
          </div>

          {/* Founder cards */}
          <div className="md:w-1/2 flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row gap-5 bg-white dark:bg-slate-900 rounded-2xl px-6 py-6 border border-outline-variant/20 shadow-sm shadow-primary/5">
              
              <div className="shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md shadow-primary/10 border-2 border-white dark:border-slate-800">
                <img 
                  src="/profile.jpg" 
                  alt={t('founders.name1')} 
                  className="absolute inset-0 w-full h-full object-cover scale-[1.35] origin-[50%_30%]"
                />
              </div>
              
              <div className="flex flex-col justify-center">
                <p className="font-headline font-extrabold text-lg text-on-surface">{t('founders.name1')}</p>
                <p className="text-xs sm:text-sm font-semibold text-primary mt-0.5">{t('founders.role1')}</p>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  {t('founders.bio1')}
                </p>
              </div>
            </div>

            {/* Subtle team note */}
            <div className="flex items-center gap-3 px-2 mt-2">
              <div className="flex -space-x-2 shrink-0">
                <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-white dark:border-slate-950 flex items-center justify-center text-[9px] font-bold text-on-surface-variant">{'</>'}</div>
                <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-white dark:border-slate-950 flex items-center justify-center text-[9px] font-bold text-on-surface-variant">{'<'}</div>
                <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-white dark:border-slate-950 flex items-center justify-center text-[9px] font-bold text-on-surface-variant">{'>'}</div>
              </div>
              <p className="text-[11px] text-on-surface-variant/80 font-medium italic">
                {t('founders.team_note')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Founders;
