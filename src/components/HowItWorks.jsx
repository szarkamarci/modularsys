import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      num: "1",
      title: t('how_it_works.step1_title'),
      desc: t('how_it_works.step1_desc'),
      icon: "search"
    },
    {
      num: "2",
      title: t('how_it_works.step2_title'),
      desc: t('how_it_works.step2_desc'),
      icon: "dashboard"
    },
    {
      num: "3",
      title: t('how_it_works.step3_title'),
      desc: t('how_it_works.step3_desc'),
      icon: "insights"
    },
    {
      num: "4",
      title: t('how_it_works.step4_title'),
      desc: t('how_it_works.step4_desc'),
      icon: "rocket_launch"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-32 relative">
      <div className="text-center mb-16">
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
          {t('how_it_works.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="bg-surface-container-lowest glass-card rounded-2xl p-8 shadow-md border border-outline-variant/10 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{step.icon}</span>
              </div>
              <span className="text-4xl font-headline font-black text-outline-variant/20">{step.num}</span>
            </div>
            
            <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{step.title}</h3>
            <p className="text-on-surface-variant text-base leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Security / Trust Block */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-surface-container-low rounded-2xl p-8 md:p-12 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="md:w-1/3 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-secondary-container flex items-center justify-center relative">
             <div className="absolute inset-0 bg-secondary/10 rounded-full animate-ping opacity-75"></div>
             <span className="material-symbols-outlined text-4xl text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
          </div>
        </div>
        <div className="md:w-2/3 text-center md:text-left">
          <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">{t('how_it_works.trust_title')}</h3>
          <p className="text-on-surface-variant text-lg mb-6 leading-relaxed">
            {t('how_it_works.trust_desc')}
          </p>
          <ul className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-center justify-center md:justify-start gap-3 text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                <span>{t(`how_it_works.trust_bullet${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
