import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SolutionPath = ({ prefix, icon, t }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center gap-3 mb-5">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>{icon}</span>
      <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
        {t(`solutions.${prefix}_title`)}
      </h3>
    </div>

    <p className="text-on-surface-variant leading-relaxed mb-6">
      {t(`solutions.${prefix}_desc`)}
    </p>

    {/* Business question */}
    <div className="border-l-2 border-primary/30 pl-4 mb-6">
      <p className="text-sm font-semibold text-on-surface italic">
        &ldquo;{t(`solutions.${prefix}_question`)}&rdquo;
      </p>
    </div>

    {/* Mini visual example */}
    <div className="bg-surface-container-low rounded-lg p-4 mb-6 space-y-3 flex-grow">
      <div className="flex items-start gap-2.5">
        <span className="w-4 h-4 rounded bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-amber-700" style={{ fontSize: 10 }}>warning</span>
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 font-bold">Signal</p>
          <p className="text-sm text-on-surface">{t(`solutions.${prefix}_example_signal`)}</p>
        </div>
      </div>
      <div className="flex items-start gap-2.5">
        <span className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 10 }}>task_alt</span>
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 font-bold">Action</p>
          <p className="text-sm text-on-surface-variant">{t(`solutions.${prefix}_example_action`)}</p>
        </div>
      </div>
      <p className="text-[9px] text-on-surface-variant/40 italic pt-1">{t('hero.illustrative_label')}</p>
    </div>

    <Link
      to="/audit"
      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
    >
      {t(`solutions.${prefix}_cta`)}
      <span className="material-symbols-outlined text-primary group-hover:translate-x-0.5 transition-transform" style={{ fontSize: 16 }}>arrow_forward</span>
    </Link>
  </div>
);

const Solutions = () => {
  const { t } = useTranslation();

  return (
    <section id="solutions" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 scroll-mt-24">
      <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4 max-w-lg leading-snug">
        {t('solutions.title')}
      </h2>
      <div className="h-px w-16 bg-primary/30 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <SolutionPath prefix="inv" icon="inventory_2" t={t} />
        <SolutionPath prefix="conv" icon="conversion_path" t={t} />
      </div>
    </section>
  );
};

export default Solutions;
