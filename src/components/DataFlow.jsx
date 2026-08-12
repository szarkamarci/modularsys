import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const STEPS = [
  { key: '1', icon: 'database', color: 'text-on-surface-variant', bg: 'bg-surface-container' },
  { key: '2', icon: 'auto_awesome', color: 'text-primary', bg: 'bg-primary/8' },
  { key: '3', icon: 'task_alt', color: 'text-emerald-700', bg: 'bg-emerald-50' },
];

const DataFlow = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <ScrollReveal>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-14 max-w-md leading-snug">
          {t('dataflow.title')}
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {STEPS.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className="flex gap-4">
              {/* Number + icon */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${step.color}`} style={{ fontSize: 18 }}>
                    {step.icon}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px h-full bg-outline-variant/20 mt-2 hidden md:block" />
                )}
              </div>
              {/* Text */}
              <div className="pt-1">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1.5">
                  {t(`dataflow.step${step.key}_label`)}
                </p>
                <p className="text-on-surface-variant text-[15px] leading-relaxed">
                  {t(`dataflow.step${step.key}_desc`)}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default DataFlow;
