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
          <div className="md:w-1/2 flex flex-wrap gap-4">
            <div className="flex items-center gap-4 bg-surface-container-low rounded-lg px-5 py-4 border border-outline-variant/10">
              {/* Initials avatar */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-sm">SM</span>
              </div>
              <div>
                <p className="font-headline font-bold text-sm text-on-surface">{t('founders.name1')}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{t('founders.role1')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Founders;
