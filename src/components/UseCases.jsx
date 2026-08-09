import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const USE_CASE_ICONS = ['storefront', 'group', 'handshake', 'analytics'];

const UseCases = () => {
  const { t } = useTranslation();

  const cases = [1, 2, 3, 4].map((index) => ({
    title: t(`use_cases.case${index}_title`),
    desc: t(`use_cases.case${index}_desc`),
    icon: USE_CASE_ICONS[index - 1],
  }));

  return (
    <section id="use-cases" className="max-w-7xl mx-auto px-4 md:px-8 mb-24 md:mb-32 scroll-mt-24">
      <div className="max-w-2xl mb-10 md:mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight mb-4">
          {t('use_cases.title')}
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          {t('use_cases.intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {cases.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.45 }}
            className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/10 hover:border-primary/20 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>{item.icon}</span>
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-on-surface mb-1.5">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-sm text-on-surface-variant/70 text-center italic">
        {t('use_cases.bottom_line')}
      </p>
    </section>
  );
};

export default UseCases;
