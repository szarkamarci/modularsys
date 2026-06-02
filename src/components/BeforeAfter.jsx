import { useTranslation } from 'react-i18next';

const BeforeAfter = () => {
  const { t } = useTranslation();
  
  return (
    <section className="max-w-7xl mx-auto px-8 mb-40">
      <div className="text-center mb-20">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-on-surface">{t('beforeAfter.title')}</h2>
        <p className="text-on-surface-variant text-lg">{t('beforeAfter.subtitle')}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Before */}
        <div className="group">
          <div className="mb-4 flex items-center gap-2 text-error font-bold bg-error/10 px-4 py-2 rounded-lg w-fit">
            <span className="material-symbols-outlined text-error">warning</span>
            {t('beforeAfter.before_label')}
          </div>
          <div className="bg-surface-container-high/50 p-1 rounded-lg grayscale opacity-70 group-hover:grayscale-0 transition-all duration-500">
            <img 
              className="rounded-lg w-full h-80 object-cover shadow-inner" 
              alt="chaotic cluttered spreadsheet" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC92EEI83Tf_izQOwbDybd7_i5n6BxWhVJqafRI8vDBk_4SPsVbNADPyBPE7miHv9SP8BvIFEOKxmBcxbmIC5CTKdjQ-0TxdXHUf9yofZNdNBoeJKL7WHnOQqAiX2DISodogB9OBP3kHboZaOnX_DPJ6MnhpZA-CoyAaFXfmMdBxXPwbfVoS3hiJX5Up2Np2ChRBlJroZdMvYCx99RpiuRnSS4iiFah_y4UD0eKg3iSEOTJcXm147iCrQiuXuANCyC43WIG2Lwdbfg"
            />
          </div>
        </div>
        
        {/* After */}
        <div>
          <div className="mb-4 flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-lg w-fit">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            {t('beforeAfter.after_label')}
          </div>
          <div className="bg-surface-container-lowest p-2 rounded-lg shadow-2xl shadow-primary/10 border border-primary/5">
            <img 
              className="rounded-lg w-full h-auto object-cover border border-outline-variant/10" 
              alt="ModularAI Dashboard Example" 
              src="/dashboard_example.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
