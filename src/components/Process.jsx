import { useTranslation } from 'react-i18next';

const STEP_ICONS = ['forum', 'database', 'dashboard', 'trending_up'];

const Process = () => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 scroll-mt-24">
      <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-12 max-w-md leading-snug">
        {t('process.title')}
      </h2>

      {/* Steps — horizontal on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>{STEP_ICONS[n - 1]}</span>
            </div>
            <div>
              <p className="font-headline font-bold text-sm text-on-surface mb-1">{t(`process.step${n}_title`)}</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">{t(`process.step${n}_desc`)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Security / deployment compact block */}
      <div className="border-t border-outline-variant/15 pt-10 max-w-2xl">
        <h3 className="font-headline text-lg font-bold text-on-surface mb-2">{t('process.security_title')}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-5">{t('process.security_desc')}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {[1, 2, 3, 4].map(n => (
            <li key={n} className="flex items-center gap-2 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary/50" style={{ fontSize: 14 }}>check</span>
              {t(`process.security_bullet${n}`)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Process;
