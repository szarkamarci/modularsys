import { useTranslation } from 'react-i18next';

const TrustBar = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-surface-container-low py-12 mb-32">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <p className="text-on-surface-variant font-medium text-lg italic">
          {t('trustbar.quote')}
        </p>
        <p className="text-on-surface-variant/60 text-sm mt-2 not-italic">
          {t('trustbar.subtext')}
        </p>
      </div>
    </div>
  );
};

export default TrustBar;
