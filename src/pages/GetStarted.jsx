import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

import InteractiveBackground from '../components/InteractiveBackground';

const demoCards = [
  {
    key: 'retail',
    icon: 'inventory_2',
    href: '/demo-dashboard',
  },
  {
    key: 'workforce',
    icon: 'groups',
    href: '/demo-dashboard/scenario/workforce',
  },
  {
    key: 'sales',
    icon: 'account_circle',
    href: '/demo-dashboard/scenario/sales',
  },
  {
    key: 'operations',
    icon: 'pending_actions',
    href: '/demo-dashboard/scenario/operations',
  },
];

const GetStarted = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden font-body px-4 py-16">
      <InteractiveBackground />
      
      {/* Absolute top left back button */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-bold text-xs tracking-wider px-4 py-2 rounded-full border border-outline-variant/10 shadow-sm transition-all duration-300 active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          {t('demo_selector.back')}
        </button>
      </div>

      {/* Absolute top right language switcher */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center">
            <img src="/assets/brand/mark.svg" alt="ModularAI" className="w-full h-full drop-shadow-sm" />
          </div>
          <p className="inline-flex items-center rounded-full bg-primary-fixed px-4 py-1.5 text-sm font-bold text-on-primary-fixed-variant mb-5">
            {t('demo_selector.badge')}
          </p>
          <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tight text-on-surface mb-5">
            {t('demo_selector.title')}
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t('demo_selector.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {demoCards.map((card) => (
            <Link
              key={card.key}
              to={card.href}
              className="group bg-surface-container-lowest/85 backdrop-blur-3xl rounded-2xl p-6 min-h-[300px] border border-outline-variant/20 shadow-[0px_20px_40px_rgba(87,73,194,0.06)] hover:-translate-y-1 hover:shadow-[0px_28px_60px_rgba(87,73,194,0.1)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                  </div>
                  <span className="rounded-full bg-surface-container-low px-3 py-1 text-[11px] font-label font-black uppercase tracking-wider text-on-surface-variant">
                    {t(`demo_selector.cards.${card.key}.badge`)}
                  </span>
                </div>
                <h2 className="font-headline text-2xl font-black text-on-surface leading-tight mb-4">
                  {t(`demo_selector.cards.${card.key}.title`)}
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {t(`demo_selector.cards.${card.key}.desc`)}
                </p>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-primary font-label font-black">
                {t('demo_selector.open_demo')}
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
          <a
            href="mailto:hello@modularsys.ai"
            className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            {t('demo_selector.contact')} hello@modularsys.ai
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
