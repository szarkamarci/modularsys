import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  
  return (
    <section className="max-w-7xl mx-auto px-8 mb-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Feature 1: The Crystal Ball */}
        <div className="md:col-span-8 bg-surface-container-low rounded-lg p-10 flex flex-col justify-between overflow-hidden relative group">
          <div className="max-w-md relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-white text-3xl">article</span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-4">
              {t('features.feat1_title')} <span className="hidden md:block text-primary-container text-lg font-medium opacity-70 mt-1">{t('features.feat1_subtitle')}</span>
            </h3>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-4 md:mb-8">
              {t('features.feat1_desc')}
            </p>
            <div className="hidden md:inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-outline-variant/10">
              <span className="text-primary font-black text-xl">+577 db</span>
              <span className="text-on-surface-variant text-sm font-medium">{t('features.feat1_stat')}</span>
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] w-2/3 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
            <span className="material-symbols-outlined text-[300px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
          </div>
        </div>

        {/* Feature 2: The Ghostbuster */}
        <div className="md:col-span-4 bg-surface-container-lowest border border-surface-container rounded-lg p-10 flex flex-col justify-between shadow-[0px_20px_40px_rgba(87,73,194,0.03)]">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-tertiary-container flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-white text-3xl">mist</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4">{t('features.feat2_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              {t('features.feat2_desc')}
            </p>
          </div>
          <div className="hidden md:block bg-error-container/20 p-4 rounded-xl border border-error/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase text-error">{t('features.feat2_stat_label')}</span>
              <span className="text-error font-black text-lg">{t('features.feat2_stat_val')}</span>
            </div>
            <div className="h-1.5 w-full bg-error/10 rounded-full">
              <div className="h-full w-4 bg-error rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Feature 3: Fries With That? */}
        <div className="md:col-span-12 bg-white rounded-lg p-10 flex flex-col md:flex-row gap-12 items-center shadow-[0px_40px_80px_rgba(87,73,194,0.05)] border border-primary/5">
          <div className="md:w-1/2">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-white text-3xl">shopping_cart_checkout</span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-4">{t('features.feat3_title')}</h3>
            <p className="text-on-surface-variant text-xl leading-relaxed">
              {t('features.feat3_desc')}
            </p>
          </div>
          <div className="md:w-1/2 w-full hidden md:block">
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary font-bold">1</div>
                  <span className="font-bold">{t('features.feat3_item1')}</span>
                </div>
                <span className="material-symbols-outlined text-primary">add_circle</span>
              </div>
              
              <div className="p-4 bg-primary text-white rounded-xl flex items-center justify-between scale-105 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center font-bold">2</div>
                  <span className="font-bold">{t('features.feat3_item2')}</span>
                </div>
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              
              <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between opacity-60">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold">3</div>
                  <span className="font-bold">{t('features.feat3_item3')}</span>
                </div>
                <span className="material-symbols-outlined">add_circle</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Features;
