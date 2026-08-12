import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section id="cta" className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center scroll-mt-24">
      <ScrollReveal>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4 leading-snug">
          {t('cta.title')}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-xl mx-auto">
          {t('cta.subtitle')}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <Link
          to="/audit"
          className="inline-block bg-primary text-white px-8 py-3.5 rounded-full font-semibold text-[15px] hover:bg-primary/90 transition-colors active:scale-[0.97] shadow-lg shadow-primary/15"
        >
          {t('cta.button')}
        </Link>
        <p className="text-xs text-on-surface-variant/50 mt-4">{t('cta.disclaimer')}</p>
      </ScrollReveal>
    </section>
  );
};

export default CTA;
