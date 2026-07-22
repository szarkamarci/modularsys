// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FunnelCard = ({ t }) => {
  const stages = [
    {
      key: 'hero.funnel_stage1',
      value: '2,140',
      pct: null,
      barPct: 100,
      bottleneck: false,
    },
    {
      key: 'hero.funnel_stage2',
      value: '1,680',
      pct: '78.5%',
      barPct: 78,
      bottleneck: false,
    },
    {
      key: 'hero.funnel_stage3',
      value: '186',
      pct: '11.1%',
      barPct: 11,
      bottleneck: true,
    },
    {
      key: 'hero.funnel_stage4',
      value: '43',
      pct: '23.1%',
      barPct: 2,
      bottleneck: false,
    },
  ];

  return (
    <div
      className="relative bg-white rounded-xl overflow-hidden"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 48px -8px rgba(87,73,194,0.10), 0 0 0 1px rgba(0,0,0,0.05)',
      }}
    >
      {/* Top bar — status strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/40" />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-zinc-100">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-headline font-bold text-zinc-900 text-sm tracking-tight">
                {t('hero.funnel_card_title')}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                {t('hero.funnel_demo_label')}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-none font-medium">
              {t('hero.funnel_subtitle')}
            </p>
          </div>
        </div>

        {/* Source chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {['Meta', 'Google', 'CRM'].map((src) => (
            <span
              key={src}
              className="text-[10px] font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded-md leading-none"
            >
              {src}
            </span>
          ))}
        </div>
      </div>

      {/* Funnel rows */}
      <div className="px-5 py-3 space-y-1.5">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`rounded-lg px-3 py-2.5 ${
              stage.bottleneck
                ? 'bg-rose-50 border border-rose-200/60'
                : 'bg-zinc-50 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    stage.bottleneck ? 'bg-rose-400' : i === 0 ? 'bg-primary' : 'bg-zinc-300'
                  }`}
                />
                <span
                  className={`text-xs font-medium truncate ${
                    stage.bottleneck ? 'text-rose-700' : 'text-zinc-600'
                  }`}
                >
                  {t(stage.key)}
                </span>
                {stage.bottleneck && (
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide text-rose-500 bg-rose-100 border border-rose-200 px-1.5 py-0.5 rounded-sm leading-none">
                    Bottleneck
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                {stage.pct && (
                  <span
                    className={`text-[11px] font-semibold tabular-nums ${
                      stage.bottleneck ? 'text-rose-500' : 'text-zinc-400'
                    }`}
                  >
                    {stage.pct}
                  </span>
                )}
                <span
                  className={`text-sm font-bold tabular-nums ${
                    stage.bottleneck ? 'text-rose-700' : 'text-zinc-800'
                  }`}
                >
                  {stage.value}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-zinc-200/60 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  stage.bottleneck
                    ? 'bg-rose-400'
                    : i === 0
                    ? 'bg-primary'
                    : i === 1
                    ? 'bg-primary/55'
                    : 'bg-primary/20'
                }`}
                style={{ width: `${stage.barPct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI insight box */}
      <div className="mx-5 mb-5 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3">
        <div className="flex items-start gap-2.5">
          <span
            className="material-symbols-outlined text-primary shrink-0 mt-0.5"
            style={{ fontSize: '14px' }}
          >
            lightbulb
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-zinc-800 leading-snug mb-1">
              {t('hero.funnel_insight_title')}
            </p>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              {t('hero.funnel_insight_desc')}
            </p>
            <button className="mt-2 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors leading-none">
              {t('hero.funnel_insight_cta')} →
            </button>
          </div>
        </div>
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

      {/* Mobile Background Graphic */}
      <div className="block md:hidden absolute -top-10 -right-20 w-80 h-80 rounded-full magic-sphere pointer-events-none"></div>
      <div className="block md:hidden absolute top-20 -left-20 w-64 h-64 rounded-full bg-secondary-container/10 hero-bg-blur pointer-events-none"></div>
      <div className="block md:hidden absolute -bottom-10 right-0 w-48 h-48 border-[1.5px] border-primary/20 rounded-full hero-bg-blur opacity-20 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center relative z-10">
        {/* Left: copy */}
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
            <Link
              to="/audit"
              className="w-full sm:w-auto text-center bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl md:rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20 inline-block"
            >
              {t('hero.cta_primary')}
            </Link>
            <Link
              to="/demo-dashboard"
              className="w-full sm:w-auto text-center bg-surface-container-low text-primary md:text-on-surface px-8 py-4 rounded-xl md:rounded-full font-bold text-lg hover:bg-surface-container transition-colors shadow-sm md:shadow-none inline-block"
            >
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

        {/* Right: Funnel card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="lg:w-2/5 w-full relative"
        >
          {/* Ambient glow */}
          <div className="absolute -inset-6 bg-primary/8 blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative">
            <FunnelCard t={t} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
