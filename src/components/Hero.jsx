// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const INPUTS = ['visual_input1', 'visual_input2', 'visual_input3', 'visual_input4'];
const OUTPUTS = ['visual_output1', 'visual_output2', 'visual_output3', 'visual_output4'];
const INPUT_ICONS = ['campaign', 'contact_page', 'shopping_bag', 'inventory_2'];
const OUTPUT_ICONS = ['trending_up', 'warning_amber', 'star', 'task_alt'];

const DataFlowCard = ({ t }) => (
  <div
    className="relative bg-white rounded-xl border border-zinc-200/80"
    style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(87,73,194,0.09)' }}
  >
    <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-t-xl" />

    <div className="px-5 py-5">
      {/* Inputs label */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">{t('hero.visual_inputs_label')}</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {INPUTS.map((key, i) => (
          <div key={i} className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2">
            <span className="material-symbols-outlined text-primary shrink-0" style={{ fontSize: '14px' }}>{INPUT_ICONS[i]}</span>
            <span className="text-xs font-medium text-zinc-700">{t(`hero.${key}`)}</span>
          </div>
        ))}
      </div>

      {/* ModularAI bridge */}
      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-px bg-zinc-200" />
        <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-full">
          <span className="material-symbols-outlined text-white shrink-0" style={{ fontSize: '13px' }}>auto_awesome</span>
          <span className="text-[11px] font-bold text-white">ModularAI</span>
        </div>
        <div className="flex-1 h-px bg-zinc-200" />
      </div>

      {/* Outputs label */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">{t('hero.visual_output_label')}</p>

      <div className="grid grid-cols-2 gap-2">
        {OUTPUTS.map((key, i) => (
          <div key={i} className="flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
            <span className="material-symbols-outlined text-primary shrink-0" style={{ fontSize: '14px' }}>{OUTPUT_ICONS[i]}</span>
            <span className="text-xs font-medium text-zinc-700">{t(`hero.${key}`)}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="solution" className="max-w-7xl mx-auto px-4 md:px-8 mb-20 md:mb-28 pt-24 md:pt-32 relative">

      {/* Desktop ambient orb */}
      <div className="hidden md:block absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 -z-10 pointer-events-none opacity-30">
        <div className="relative w-[500px] h-[500px] animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8477F2]/20 to-[#35618b]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-56 h-56 border border-white/20 rounded-full backdrop-blur-2xl shadow-[inset_0_0_80px_rgba(132,119,242,0.1)]" />
        </div>
      </div>

      {/* Mobile ambient */}
      <div className="block md:hidden absolute -top-10 -right-20 w-72 h-72 rounded-full magic-sphere pointer-events-none" />
      <div className="block md:hidden absolute top-20 -left-20 w-56 h-56 rounded-full bg-secondary-container/10 hero-bg-blur pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center relative z-10">
        {/* Left: copy */}
        <div className="lg:w-3/5">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-sm font-semibold tracking-wide"
          >
            {t('hero.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface mb-5 md:mb-6 leading-[1.1]"
          >
            {t('hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-4 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7 }}
            className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-xl"
          >
            {t('hero.supporting')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 w-full"
          >
            <Link
              to="/audit"
              className="w-full sm:w-auto text-center bg-primary text-white px-7 py-3.5 rounded-full font-semibold text-base hover:bg-primary/90 transition-colors active:scale-95 shadow-lg shadow-primary/20 inline-block"
            >
              {t('hero.cta_primary')}
            </Link>
            <Link
              to="/demo-dashboard"
              className="w-full sm:w-auto text-center bg-surface-container-low text-on-surface px-7 py-3.5 rounded-full font-semibold text-base hover:bg-surface-container transition-colors inline-block"
            >
              {t('hero.cta_secondary')}
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-4 text-sm text-on-surface-variant/70"
          >
            {t('hero.trust_note')}
          </motion.p>
        </div>

        {/* Right: data flow visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: 'easeOut' }}
          className="lg:w-2/5 w-full max-w-sm mx-auto lg:mx-0 relative"
        >
          <div className="absolute -inset-5 bg-primary/6 blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative">
            <DataFlowCard t={t} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
