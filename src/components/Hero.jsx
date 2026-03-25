import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-24 md:pt-32 relative">
      
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
            {t('hero.title_start')}<span className="text-primary italic">{t('hero.title_highlight')}</span>{t('hero.title_end')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-on-surface-variant text-lg md:text-2xl leading-relaxed mb-8 md:mb-10 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full"
          >
            <Link to="/get-started" className="w-full sm:w-auto text-center bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl md:rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20 inline-block">
              {t('hero.cta_primary')}
            </Link>
            <Link to="/demo" className="w-full sm:w-auto text-center bg-surface-container-low text-primary md:text-on-surface px-8 py-4 rounded-xl md:rounded-full font-bold text-lg hover:bg-surface-container transition-colors shadow-sm md:shadow-none inline-block">
              {t('hero.cta_secondary')}
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:w-2/5 relative"
        >
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full"></div>
          <div className="relative bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(87,73,194,0.06)] border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-on-tertiary-fixed-variant">query_stats</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">{t('hero.stat_badge')}</p>
                <p className="font-headline font-bold">{t('hero.stat_title')}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full"
                ></motion.div>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-on-surface-variant">{t('hero.stat_label')}</span>
                <span className="text-primary">+42.8%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
