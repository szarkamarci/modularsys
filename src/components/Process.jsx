import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const STEP_ICONS = ['forum', 'database', 'dashboard', 'trending_up'];

const Process = () => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 scroll-mt-24">
      <ScrollReveal>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-12 max-w-md leading-snug">
          {t('process.title')}
        </h2>
      </ScrollReveal>

      {/* Timeline */}
      <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 mb-16">
        
        {/* Mobile vertical connector */}
        <div className="lg:hidden absolute top-4 bottom-4 left-[15px] w-px z-0">
          <svg width="2" height="100%" className="overflow-visible">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#c8c4d5" strokeWidth="1" opacity="0.3" />
            <circle r="2" fill="#5749c2" opacity="0.35">
              <animate attributeName="cy" values="0;100%" dur="8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Desktop horizontal connector */}
        <div className="hidden lg:block absolute top-[15px] left-8 right-16 h-px z-0">
          <svg width="100%" height="2" className="overflow-visible">
            <line x1="0" y1="0" x2="100%" y2="0" stroke="#c8c4d5" strokeWidth="1" opacity="0.3" />
            <circle r="2" fill="#5749c2" opacity="0.35">
              <animate attributeName="cx" values="0;100%" dur="8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {[1, 2, 3, 4].map(n => (
          <ScrollReveal key={n} delay={n * 0.12}>
            <div className="flex lg:flex-col items-start gap-4 lg:gap-5 relative z-10">
              <div className="w-8 h-8 rounded-full bg-surface border border-[#c8c4d5]/40 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-primary/70" style={{ fontSize: 15 }}>{STEP_ICONS[n - 1]}</span>
              </div>
              <div>
                <p className="font-headline font-bold text-sm text-on-surface mb-1">{t(`process.step${n}_title`)}</p>
                <p className="text-sm text-on-surface-variant leading-relaxed lg:max-w-[220px]">{t(`process.step${n}_desc`)}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Security / deployment compact block */}
      <ScrollReveal>
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
      </ScrollReveal>
    </section>
  );
};

export default Process;
