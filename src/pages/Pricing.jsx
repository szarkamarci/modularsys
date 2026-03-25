import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-32 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 mb-24 relative">
        <div className="hero-gradient absolute inset-0 -z-10 scale-150"></div>
        <div className="max-w-3xl">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-6 md:mb-8">
            {t('pricing.hero_title_start')} <span className="text-primary-container block mt-2">{t('pricing.hero_title_highlight')}</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            {t('pricing.hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Spreadsheet Chaos */}
          <div className="bg-surface-container-low rounded-xl p-8 md:p-10 transition-all hover:translate-y-[-4px]">
            <div className="mb-8">
              <span className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest">{t('pricing.past_badge')}</span>
              <h3 className="font-headline text-3xl font-bold mt-2">{t('pricing.past_title')}</h3>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-extrabold text-on-surface">{t('pricing.past_price')}</span>
              <p className="text-on-surface-variant mt-2">{t('pricing.past_desc')}</p>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-error mt-0.5">close</span>
                <span>{t('pricing.past_feature1')}</span>
              </li>
              <li className="flex items-start gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-error mt-0.5">close</span>
                <span>{t('pricing.past_feature2')}</span>
              </li>
              <li className="flex items-start gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-error mt-0.5">close</span>
                <span>{t('pricing.past_feature3')}</span>
              </li>
            </ul>
            <button className="w-full py-4 rounded-full font-headline font-bold text-outline border-2 border-outline/20 hover:bg-surface-container-highest transition-colors">
              {t('pricing.past_btn')}
            </button>
          </div>

          {/* ModularAI (Featured) */}
          <div className="relative group mt-6 lg:mt-0">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-tertiary-container rounded-[2.2rem] blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-[0_32px_64px_rgba(87,73,194,0.12)] border border-primary/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 flex items-center justify-center rounded-full text-xs font-bold tracking-widest uppercase whitespace-nowrap">
                {t('pricing.present_badge')}
              </div>
              <div className="mb-8">
                <span className="text-label-md font-bold text-primary uppercase tracking-widest">{t('pricing.present_sub')}</span>
                <h3 className="font-headline text-3xl font-bold mt-2">{t('pricing.present_title')}</h3>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-on-surface">{t('pricing.present_price')}</span>
                  <span className="text-on-surface-variant font-medium">{t('pricing.present_period')}</span>
                </div>
                <p className="text-primary-container mt-2 font-medium">{t('pricing.present_desc')}</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-medium">{t('pricing.present_feature1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-medium">{t('pricing.present_feature2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-medium">{t('pricing.present_feature3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-medium">{t('pricing.present_feature4')}</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-full font-headline font-bold bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]">
                {t('pricing.present_btn')}
              </button>
            </div>
          </div>

          {/* Enterprise Dinosaurs */}
          <div className="bg-surface-container-low rounded-xl p-8 md:p-10 transition-all hover:translate-y-[-4px] mt-6 lg:mt-0">
            <div className="mb-8">
              <span className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest">{t('pricing.relic_badge')}</span>
              <h3 className="font-headline text-3xl font-bold mt-2">{t('pricing.relic_title')}</h3>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-extrabold text-on-surface">{t('pricing.relic_price')}</span>
              <span className="text-on-surface-variant font-medium">{t('pricing.relic_period')}</span>
              <p className="text-on-surface-variant mt-2">{t('pricing.relic_desc')}</p>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-on-surface-variant/40 mt-0.5">history</span>
                <span>{t('pricing.relic_feature1')}</span>
              </li>
              <li className="flex items-start gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-on-surface-variant/40 mt-0.5">school</span>
                <span>{t('pricing.relic_feature2')}</span>
              </li>
              <li className="flex items-start gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-on-surface-variant/40 mt-0.5">call</span>
                <span>{t('pricing.relic_feature3')}</span>
              </li>
            </ul>
            <button className="w-full py-4 rounded-full font-headline font-bold text-on-surface border-2 border-on-surface/10 hover:bg-surface-container-highest transition-colors">
              {t('pricing.relic_btn')}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-start py-20 border-t border-outline-variant/20">
        <div className="md:col-span-4 sticky top-32">
          <h2 className="font-headline text-4xl font-bold tracking-tight mb-6">{t('pricing.faq_title')}</h2>
          <p className="text-on-surface-variant leading-relaxed">{t('pricing.faq_subtitle')}</p>
          <div className="mt-12 p-8 bg-surface-container rounded-lg">
            <p className="font-bold text-primary mb-2 italic">{t('pricing.faq_quote')}</p>
            <p className="text-sm text-on-surface-variant">{t('pricing.faq_author')}</p>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-12">
          <div className="group">
            <h4 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors">{t('pricing.faq_q1')}</h4>
            <p className="text-on-surface-variant leading-relaxed text-lg">{t('pricing.faq_a1')}</p>
          </div>
          <div className="group">
            <h4 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors">{t('pricing.faq_q2')}</h4>
            <p className="text-on-surface-variant leading-relaxed text-lg">{t('pricing.faq_a2')}</p>
          </div>
          <div className="group">
            <h4 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors">{t('pricing.faq_q3')}</h4>
            <p className="text-on-surface-variant leading-relaxed text-lg">{t('pricing.faq_a3')}</p>
          </div>
          <div className="pt-8">
            <div className="p-1 rounded-xl bg-surface-container-high w-fit">
              <a className="flex items-center gap-4 px-8 py-4 bg-surface-container-lowest rounded-lg hover:bg-surface-container transition-colors" href="#">
                <span className="font-headline font-bold">{t('pricing.faq_more')}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Card */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-20">
        <div className="bg-primary text-on-primary rounded-xl p-10 md:p-16 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-container rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-tertiary rounded-full blur-3xl opacity-30"></div>
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold mb-8 relative z-10">{t('pricing.cta_title')}</h2>
          <button className="bg-surface-container-lowest text-primary px-8 md:px-10 py-4 md:py-5 rounded-full font-headline font-extrabold text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl relative z-10 w-full sm:w-auto">
            {t('pricing.cta_btn')}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
