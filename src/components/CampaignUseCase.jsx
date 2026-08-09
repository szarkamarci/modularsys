import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STAGES = [
  { key: 'funnel_stage1', barPct: 100, dropoff: false },
  { key: 'funnel_stage2', value: '1,680', barPct: 79,  dropoff: false },
  { key: 'funnel_stage3', value: '186',   barPct: 11,  dropoff: true  },
  { key: 'funnel_stage4', value: '43',    barPct: 2,   dropoff: false },
];
const VALUES = ['2,140', '1,680', '186', '43'];

const MiniCampaignFunnel = ({ t }) => (
  <div
    className="bg-white rounded-xl border border-zinc-200/80 overflow-hidden"
    style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(87,73,194,0.09)' }}
  >
    <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
    <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-zinc-100">
      <p className="font-headline font-bold text-zinc-900 text-sm tracking-tight">{t('campaign_feature.funnel_title')}</p>
      <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{t('campaign_feature.funnel_demo_label')}</span>
    </div>
    <div className="px-5 py-4 space-y-2.5">
      {STAGES.map((stage, i) => (
        <div key={i} className={`rounded-lg px-3 py-2.5 ${stage.dropoff ? 'bg-rose-50 border border-rose-200/60' : 'bg-zinc-50'}`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-xs font-medium ${stage.dropoff ? 'text-rose-700' : 'text-zinc-600'}`}>{t(`campaign_feature.${stage.key}`)}</span>
            <span className={`text-sm font-bold tabular-nums ${stage.dropoff ? 'text-rose-700' : 'text-zinc-800'}`}>{VALUES[i]}</span>
          </div>
          <div className="px-0.5">
            <div className="h-1 w-full bg-zinc-200/70 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${stage.dropoff ? 'bg-rose-400' : i === 0 ? 'bg-primary' : i === 1 ? 'bg-primary/60' : 'bg-primary/25'}`}
                style={{ width: `${stage.barPct}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mx-5 mb-5 flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5">
      <span className="material-symbols-outlined text-zinc-400 shrink-0" style={{ fontSize: '14px' }}>warning</span>
      <p className="text-[11px] text-zinc-500 font-medium">{t('campaign_feature.funnel_insight')}</p>
    </div>
  </div>
);

const CampaignUseCase = () => {
  const { t } = useTranslation();

  return (
    <section id="campaign-intelligence" className="max-w-7xl mx-auto px-4 md:px-8 mb-24 md:mb-32 scroll-mt-24">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 items-center">

          {/* Left: copy */}
          <div className="lg:w-1/2">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary/70 bg-primary/6 border border-primary/10 px-3 py-1 rounded-full mb-5">
              {t('campaign_feature.label')}
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-4 leading-tight">
              {t('campaign_feature.title')}
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              {t('campaign_feature.desc')}
            </p>
            <Link
              to="/demo-dashboard"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              {t('campaign_feature.cta')}
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </Link>
          </div>

          {/* Right: funnel card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full max-w-sm mx-auto lg:mx-0 relative"
          >
            <div className="absolute -inset-4 bg-primary/5 blur-xl rounded-3xl pointer-events-none" />
            <div className="relative">
              <MiniCampaignFunnel t={t} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CampaignUseCase;
