import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 md:px-8 mb-24 md:mb-32">

      <div className="mb-10 md:mb-14">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{t('features.section_title')}</p>
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface max-w-xl leading-tight">{t('features.feat1_title')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Capability 1 — Revenue & Conversion */}
        <div className="md:col-span-7 bg-surface-container-low rounded-lg p-8 flex flex-col justify-between overflow-hidden relative group">
          <div className="max-w-md relative z-10">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-6 shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>conversion_path</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-3">{t('features.feat1_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">{t('features.feat1_desc')}</p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '15px' }}>insights</span>
              <span className="text-on-surface-variant text-xs font-medium">{t('features.feat1_stat')}</span>
            </div>
          </div>
          <div className="absolute right-[-8%] bottom-[-8%] w-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '240px', fontVariationSettings: "'FILL' 1" }}>conversion_path</span>
          </div>
        </div>

        {/* Capability 2 — Product & Operational */}
        <div className="md:col-span-5 bg-surface-container-lowest border border-surface-container rounded-lg p-8 flex flex-col justify-between shadow-[0px_16px_32px_rgba(87,73,194,0.04)]">
          <div>
            <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>inventory_2</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-3">{t('features.feat2_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">{t('features.feat2_desc')}</p>
          </div>
          <div className="bg-amber-50/80 p-4 rounded-lg border border-amber-200/60">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold uppercase text-amber-700">{t('features.feat2_stat_label')}</span>
              <span className="material-symbols-outlined text-amber-600" style={{ fontSize: '16px' }}>warning_amber</span>
            </div>
            <p className="text-sm font-semibold text-on-surface">{t('features.feat2_stat_val')}</p>
            <div className="mt-2 h-1 w-full bg-amber-200/60 rounded-full">
              <div className="h-full w-1/4 bg-amber-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Capability 3 — Decision Support (full width) */}
        <div className="md:col-span-12 bg-white rounded-lg p-8 flex flex-col md:flex-row gap-8 items-start md:items-center shadow-[0px_2px_4px_rgba(0,0,0,0.04),0px_16px_32px_rgba(87,73,194,0.05)] border border-primary/5">
          <div className="md:w-1/2">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>summarize</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-3">{t('features.feat3_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed">{t('features.feat3_desc')}</p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-primary text-white px-5 py-3 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <span className="text-sm font-semibold">{t('features.feat3_item1')}</span>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low px-5 py-3 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-xs text-primary font-bold shrink-0">2</span>
                <span className="text-sm font-semibold">{t('features.feat3_item2')}</span>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low px-5 py-3 rounded-lg opacity-65">
                <span className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <span className="text-sm font-semibold">{t('features.feat3_item3')}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
