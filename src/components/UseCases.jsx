import { useTranslation } from 'react-i18next';

const UseCases = () => {
  const { t } = useTranslation();

  const cases = [1, 2, 3, 4].map((index) => ({
    title: t(`use_cases.case${index}_title`),
    desc: t(`use_cases.case${index}_desc`)
  }));

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-32">
      <div className="max-w-3xl mb-12 md:mb-16">
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-5">
          {t('use_cases.title')}
        </h2>
        <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed">
          {t('use_cases.intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {cases.map((item, index) => (
          <div
            key={item.title}
            className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10"
          >
            <div className="flex items-start gap-5">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-headline font-black">
                {index + 1}
              </div>
              <div>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-3">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
