// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const STAGE_COLORS = [
  { bar: 'bg-primary', num: 'bg-primary text-white' },
  { bar: 'bg-primary/65', num: 'bg-primary/20 text-primary' },
  { bar: 'bg-error', num: 'bg-error text-white' },
  { bar: 'bg-primary/25', num: 'bg-primary/10 text-primary/60' },
];

const FunnelCard = ({ t }) => {
  const stages = [
    { key: 'hero.funnel_stage1', value: '2,140', pct: 100 },
    { key: 'hero.funnel_stage2', value: '1,680', pct: 79  },
    { key: 'hero.funnel_stage3', value: '186',   pct: 11, highlight: true },
    { key: 'hero.funnel_stage4', value: '43',    pct: 2   },
  ];

  return (
    <div className="relative bg-surface-container-lowest rounded-2xl shadow-[0px_28px_56px_rgba(87,73,194,0.12)] border border-outline-variant/10 overflow-hidden">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-outline-variant/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>conversion_path</span>
          </div>
          <div>
            <p className="font-headline font-bold text-on-surface text-sm leading-none">{t('hero.funnel_title')}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/8 text-primary rounded-full border border-primary/15">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0"></span>
          {t('hero.funnel_demo_label')}
        </span>
      </div>

      {/* Funnel stages */}
      <div className="px-5 py-4 space-y-2.5">
        {stages.map((stage, i) => {
          const colors = STAGE_COLORS[i];
          const isDropoff = stage.highlight;

          return (
            <div key={i} className={`rounded-xl p-3 ${isDropoff ? 'bg-error/5 border border-error/15' : 'bg-surface-container-low/70'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${colors.num}`}>
                    {i + 1}
                  </span>
                  <span className={`text-xs font-semibold truncate ${isDropoff ? 'text-error' : 'text-on-surface-variant'}`}>
                    {t(stage.key)}
                  </span>
                  {isDropoff && (
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide text-error bg-error/10 px-1.5 py-0.5 rounded-full">
                      drop-off
                    </span>
                  )}
                </div>
                <span className={`text-sm font-bold tabular-nums ml-2 shrink-0 ${isDropoff ? 'text-error' : 'text-on-surface'}`}>
                  {stage.value}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors.bar}`}
                  style={{ width: `${stage.pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight footer */}
      <div className="mx-5 mb-5 bg-error/5 border border-error/15 rounded-xl px-4 py-3 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-error shrink-0" style={{ fontSize: '15px', lineHeight: '1.4' }}>warning</span>
        <p className="text-xs text-on-surface-variant leading-relaxed">{t('hero.funnel_insight')}</p>
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="solution" className="max-w-7xl mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-24 md:pt-32 relative">
      
      {/* Desktop Background Graphic: Glass Orb */}
      <div className="hidden md:block absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 -z-10 pointer-events-none opacity-40">
        <div className="relative w-[600px] h-[600px] animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8477F2]/20 to-[#35618b]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full backdrop-blur-2xl shadow-[inset_0_0_80px_rgba(132,119,242,0.1)]"></div>
          <div className="absolute top-10 right-20 w-4 h-4 rounded-full bg-[#8477F2]/30 shadow-[0_0_20px_#8477F2]"></div>
          <div className="absolute bottom-40 left-10 w-6 h-6 rounded-full bg-[#35618b]/30 shadow-[0_0_20px_#35618b]"></div>
          <svg className="absolute inset-0 w-full h-full stroke-[#8477F2]/10 fill-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" strokeDasharray="0.5 8"></circle>
            <circle className="opacity-40" cx="50" cy="50" r="30" strokeDasharray="1 12"></circle>
          </svg>
        </div>
      </div>

      {/* Mobile Background Graphic: Magic Spheres */}
      <div className="block md:hidden absolute -top-10 -right-20 w-80 h-80 rounded-full magic-sphere pointer-events-none"></div>
      <div className="block md:hidden absolute top-20 -left-20 w-64 h-64 rounded-full bg-secondary-container/10 hero-bg-blur pointer-events-none"></div>
      <div className="block md:hidden absolute -bottom-10 right-0 w-48 h-48 border-[1.5px] border-primary/20 rounded-full hero-bg-blur opacity-20 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center relative z-10">
        <div className="lg:w-3/5">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-sm font-semibold tracking-wide"
          >
            {t('hero.badge')}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface mb-6 md:mb-8 leading-[1.1]"
          >
            {t('hero.headline')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-4 md:mb-6 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-on-surface-variant text-base leading-relaxed mb-8 md:mb-10 max-w-2xl"
          >
            {t('hero.supporting')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full"
          >
            <Link to="/audit" className="w-full sm:w-auto text-center bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl md:rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20 inline-block">
              {t('hero.cta_primary')}
            </Link>
            <Link to="/demo-dashboard" className="w-full sm:w-auto text-center bg-surface-container-low text-primary md:text-on-surface px-8 py-4 rounded-xl md:rounded-full font-bold text-lg hover:bg-surface-container transition-colors shadow-sm md:shadow-none inline-block">
              {t('hero.cta_secondary')}
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-sm text-on-surface-variant"
          >
            {t('hero.trust_note')}
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:w-2/5 w-full relative"
        >
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full"></div>
          <div className="relative">
            <FunnelCard t={t} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
