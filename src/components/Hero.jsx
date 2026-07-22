// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FunnelCard = ({ t }) => {
  const stages = [
    { key: 'hero.funnel_stage1', value: '2,140', barPct: 100, dropoff: false },
    { key: 'hero.funnel_stage2', value: '1,680', barPct: 79,  dropoff: false },
    { key: 'hero.funnel_stage3', value: '186',   barPct: 11,  dropoff: true  },
    { key: 'hero.funnel_stage4', value: '43',    barPct: 2,   dropoff: false },
  ];

  return (
    <div
      className="relative bg-white rounded-xl border border-zinc-200/80"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(87,73,194,0.09)' }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-center justify-between border-b border-zinc-100">
        <p className="font-headline font-bold text-zinc-900 text-sm tracking-tight">
          {t('hero.funnel_title')}
        </p>
        <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
          {t('hero.funnel_demo_label')}
        </span>
      </div>

      {/* Rows */}
      <div className="px-5 py-4 space-y-3">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`rounded-lg px-3 py-2.5 ${
              stage.dropoff
                ? 'bg-rose-50 border border-rose-200/60'
                : 'bg-zinc-50'
            }`}
          >
            {/* Label + value */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    stage.dropoff ? 'bg-rose-400' : i === 0 ? 'bg-primary' : 'bg-zinc-300'
                  }`}
                />
                <span className={`text-xs font-medium ${stage.dropoff ? 'text-rose-700' : 'text-zinc-600'}`}>
                  {t(stage.key)}
                </span>
              </div>
              <span className={`text-sm font-bold tabular-nums ${stage.dropoff ? 'text-rose-700' : 'text-zinc-800'}`}>
                {stage.value}
              </span>
            </div>

            {/* Contained bar — extra px-1 padding so bar never hits the row edges */}
            <div className="px-1">
              <div className="h-1 w-full bg-zinc-200/70 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    stage.dropoff
                      ? 'bg-rose-400'
                      : i === 0
                      ? 'bg-primary'
                      : i === 1
                      ? 'bg-primary/60'
                      : 'bg-primary/25'
                  }`}
                  style={{ width: `${stage.barPct}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warning footer — single line, subtle */}
      <div className="mx-5 mb-5 flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5">
        <span
          className="material-symbols-outlined text-zinc-400 shrink-0"
          style={{ fontSize: '14px' }}
        >
          warning
        </span>
        <p className="text-[11px] text-zinc-500 font-medium">{t('hero.funnel_insight')}</p>
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

      {/* Mobile Background */}
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

        {/* Right: card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="lg:w-2/5 w-full relative"
        >
          {/* Subtle ambient glow */}
          <div className="absolute -inset-6 bg-primary/6 blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative">
            <FunnelCard t={t} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
