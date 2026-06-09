import { Link, useParams } from 'react-router-dom';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { PageHeader } from '../../components/ui/PageHeader';
import ScenarioAssistantChat from '../../components/ScenarioAssistantChat';
import { getScenarioModuleData } from '../../config/scenarios/demo-cases';
import { useLocale } from '../../lib/locales/LocaleProvider';
import { ScenarioModuleMetric, ScenarioModuleTone } from '../../features/overview/types';

const toneClasses: Record<ScenarioModuleTone, { iconBg: string; iconText: string; border: string }> = {
  primary: { iconBg: 'bg-primary/10', iconText: 'text-primary', border: 'border-primary/15' },
  success: { iconBg: 'bg-[#dff7e7]', iconText: 'text-[#1d6b3a]', border: 'border-[#8bd1a3]/30' },
  warning: { iconBg: 'bg-[#fff4cf]', iconText: 'text-[#9a6100]', border: 'border-[#ffd36b]/40' },
  danger: { iconBg: 'bg-error-container/60', iconText: 'text-error', border: 'border-error-container/70' },
  neutral: { iconBg: 'bg-surface-container', iconText: 'text-on-surface-variant', border: 'border-outline-variant/30' },
};

function MetricCard({ metric }: { metric: ScenarioModuleMetric }) {
  const tone = toneClasses[metric.tone];

  return (
    <div className={`bg-surface-container-lowest border ${tone.border} rounded-2xl p-5 soft-shadow min-h-[150px] flex flex-col justify-between`}>
      <div className={`h-10 w-10 rounded-xl ${tone.iconBg} flex items-center justify-center mb-5`}>
        <span className={`material-symbols-outlined text-[22px] ${tone.iconText}`}>{metric.icon}</span>
      </div>
      <div>
        <p className="text-sm font-label font-medium text-on-surface-variant mb-1">{metric.label}</p>
        <p className="text-3xl font-headline font-black tracking-tight text-on-surface">{metric.value}</p>
        <p className="text-sm text-on-surface-variant mt-1">{metric.caption}</p>
      </div>
    </div>
  );
}

export default function ScenarioModulePage() {
  const { scenarioId, moduleId } = useParams();
  const { locale } = useLocale();
  const data = getScenarioModuleData(scenarioId, moduleId, locale);
  const isHu = locale === 'hu';

  if (!data) {
    return (
      <div className="w-full space-y-6">
        <PageHeader
          title={isHu ? 'Ez a bemutatófül nem található' : 'This demo tab was not found'}
          description={isHu ? 'Lépjen vissza az áttekintésre, és válasszon egy elérhető modult.' : 'Return to the overview and choose an available module.'}
        />
        <Link
          to="/demo-dashboard/scenario/workforce"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-label font-bold text-on-primary"
        >
          {isHu ? 'Vissza az áttekintéshez' : 'Back to overview'}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-lowest border border-outline-variant/20 p-6 md:p-8 ambient-shadow">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-label font-bold uppercase tracking-wider text-primary mb-5">
          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
          {data.eyebrow}
        </div>
        <PageHeader title={data.title} description={data.description} className="max-w-4xl" />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
      </section>

      {data.sections.map((section) => (
        <section key={section.title} className="space-y-4">
          <div>
            <h2 className="text-xl font-headline font-bold text-on-surface">{section.title}</h2>
            <p className="text-sm text-on-surface-variant mt-2 max-w-3xl leading-relaxed">{section.description}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {section.rows.map((row) => (
              <GlassPanel key={row.id} className="flex flex-col justify-between min-h-[230px]">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="rounded-full bg-primary-fixed px-3 py-1 text-[11px] font-label font-bold text-on-primary-fixed-variant">
                      {row.status}
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px]">arrow_outward</span>
                  </div>
                  <h3 className="text-lg font-headline font-bold text-on-surface leading-snug">{row.title}</h3>
                  <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">{row.description}</p>
                </div>
                <div className="mt-5 rounded-xl bg-surface-container-low px-4 py-3">
                  <p className="text-xs font-label font-bold uppercase tracking-wider text-primary mb-1">
                    {isHu ? 'Üzleti hatás' : 'Business impact'}
                  </p>
                  <p className="text-sm font-semibold text-on-surface">{row.impact}</p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </section>
      ))}

      {data.assistant && <ScenarioAssistantChat assistant={data.assistant} />}
    </div>
  );
}
