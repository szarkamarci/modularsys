import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-8 mb-32 pt-32">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
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
            <button className="w-full sm:w-auto bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl md:rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20">
              {t('hero.cta_primary')}
            </button>
            <button className="w-full sm:w-auto bg-surface-container-low text-primary md:text-on-surface px-8 py-4 rounded-xl md:rounded-full font-bold text-lg hover:bg-surface-container transition-colors shadow-sm md:shadow-none">
              {t('hero.cta_secondary')}
            </button>
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
