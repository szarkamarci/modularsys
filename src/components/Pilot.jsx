import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const ROW = ({ label, value, delay }) => (
  <ScrollReveal delay={delay} direction="left" distance={20}>
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-4 border-b border-outline-variant/10 last:border-0">
      <dt className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 font-bold shrink-0 sm:w-36 sm:pt-0.5">
        {label}
      </dt>
      <dd className="text-[15px] text-on-surface leading-relaxed">{value}</dd>
    </div>
  </ScrollReveal>
);

const Pilot = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
      <div className="max-w-2xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary/80 mb-4">
            {t('pilot.eyebrow')}
          </p>
        </ScrollReveal>

        <dl>
          <ROW delay={0.1} label={t('pilot.question_label')} value={t('pilot.question')} />
          <ROW delay={0.2} label={t('pilot.data_label')} value={t('pilot.data')} />
          <ROW delay={0.3} label={t('pilot.signal_label')} value={t('pilot.signal')} />
          <ROW delay={0.4} label={t('pilot.use_label')} value={t('pilot.use')} />
        </dl>
      </div>
    </section>
  );
};

export default Pilot;
