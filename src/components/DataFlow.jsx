import { useTranslation } from 'react-i18next';

const STEPS = [
  { key: '1', icon: 'database', color: 'text-on-surface-variant', bg: 'bg-surface-container' },
  { key: '2', icon: 'auto_awesome', color: 'text-primary', bg: 'bg-primary/8' },
  { key: '3', icon: 'task_alt', color: 'text-emerald-700', bg: 'bg-emerald-50' },
];

const DataFlow = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-14 max-w-md leading-snug">
        {t('dataflow.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {STEPS.map((step, i) => (
          <div key={i} className="flex gap-4">
            {/* Number + icon */}
            <div className="flex flex-col items-center shrink-0">
              <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${step.color}`} style={{ fontSize: 18 }}>
                  {step.icon}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px h-full bg-outline-variant/20 mt-2 hidden md:block" />
              )}
            </div>
            {/* Text */}
            <div className="pt-1">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1.5">
                {t(`dataflow.step${step.key}_label`)}
              </p>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                {t(`dataflow.step${step.key}_desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Animated SVG Connector line on desktop */}
      <div className="hidden md:block mt-12 w-full max-w-4xl mx-auto px-10">
        <svg width="100%" height="20" className="overflow-visible">
          <defs>
            <filter id="flowGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood floodColor="#5749c2" floodOpacity="0.5" />
              <feComposite in2="blur" operator="in" />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <line x1="0" y1="10" x2="100%" y2="10" stroke="#e3e2e7" strokeWidth="1" strokeDasharray="4 4" />
          
          <circle r="3" fill="#5749c2" filter="url(#flowGlow)">
            <animate attributeName="cx" values="0%; 100%" dur="3s" repeatCount="indefinite" />
            <animate attributeName="cy" values="10; 10" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur="3s" repeatCount="indefinite" />
          </circle>
          
          <circle r="3" fill="#5749c2" filter="url(#flowGlow)">
            <animate attributeName="cx" values="0%; 100%" dur="3s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="10; 10" dur="3s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur="3s" begin="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
};

export default DataFlow;
