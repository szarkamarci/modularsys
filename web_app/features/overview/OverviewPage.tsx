'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getProvider } from '../../lib/data/providerRegistry';
import { getScenarioConfig } from '../../lib/scenarios/scenarioRegistry';
import { useLocale } from '../../lib/locales/LocaleProvider';
import { OverviewKpi, OverviewRecommendation, OverviewTone } from './types';

const toneClasses: Record<OverviewTone, {
  iconBg: string;
  iconText: string;
  badge: string;
  border: string;
}> = {
  primary: {
    iconBg: 'bg-primary/10',
    iconText: 'text-primary',
    badge: 'bg-primary-fixed text-on-primary-fixed-variant',
    border: 'border-primary/15',
  },
  success: {
    iconBg: 'bg-[#dff7e7]',
    iconText: 'text-[#1d6b3a]',
    badge: 'bg-[#dff7e7] text-[#1d6b3a]',
    border: 'border-[#8bd1a3]/30',
  },
  warning: {
    iconBg: 'bg-[#fff4cf]',
    iconText: 'text-[#9a6100]',
    badge: 'bg-[#fff4cf] text-[#9a6100]',
    border: 'border-[#ffd36b]/40',
  },
  danger: {
    iconBg: 'bg-error-container/60',
    iconText: 'text-error',
    badge: 'bg-error-container text-on-error-container',
    border: 'border-error-container/70',
  },
  neutral: {
    iconBg: 'bg-surface-container',
    iconText: 'text-on-surface-variant',
    badge: 'bg-surface-container text-on-surface-variant',
    border: 'border-outline-variant/30',
  },
};

const urgencyClasses: Record<OverviewRecommendation['urgency'], { badge: string; dot: string }> = {
  High: { badge: 'bg-error-container text-on-error-container', dot: 'bg-error' },
  Medium: { badge: 'bg-[#fff4cf] text-[#9a6100]', dot: 'bg-[#d98900]' },
  Low: { badge: 'bg-surface-container text-on-surface-variant', dot: 'bg-outline' },
};

function KpiCard({ kpi }: { kpi: OverviewKpi }) {
  const tone = toneClasses[kpi.tone];

  return (
    <div className={`bg-surface-container-lowest border ${tone.border} rounded-2xl p-5 soft-shadow hover-lift min-h-[172px] flex flex-col justify-between`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`h-10 w-10 rounded-xl ${tone.iconBg} flex items-center justify-center`}>
          <span className={`material-symbols-outlined text-[22px] ${tone.iconText}`}>{kpi.icon}</span>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-label font-bold ${tone.badge}`}>
          {kpi.trend}
        </span>
      </div>
      <div>
        <p className="text-sm font-label font-medium text-on-surface-variant mb-1">{kpi.label}</p>
        <p className="text-3xl font-headline font-black tracking-tight text-on-surface">{kpi.value}</p>
        <p className="text-sm text-on-surface-variant mt-1">{kpi.caption}</p>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  expectedImpactLabel,
}: {
  recommendation: OverviewRecommendation;
  expectedImpactLabel: string;
}) {
  const urgency = urgencyClasses[recommendation.urgency];

  return (
    <div className="bg-surface-container-lowest/80 border border-outline-variant/20 rounded-2xl p-5 soft-shadow hover-lift">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <StatusBadge label={recommendation.urgency} badgeClass={urgency.badge} dotClass={urgency.dot} />
          <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
        </div>
        <div>
          <h3 className="text-base font-headline font-bold text-on-surface leading-snug">{recommendation.title}</h3>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{recommendation.description}</p>
        </div>
        <div className="rounded-xl bg-surface-container-low px-4 py-3">
          <p className="text-xs font-label font-bold uppercase tracking-wider text-primary mb-1">{expectedImpactLabel}</p>
          <p className="text-sm font-semibold text-on-surface">{recommendation.impact}</p>
        </div>
        <Link
          href={recommendation.route}
          className="inline-flex w-max items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-label font-bold text-on-primary transition hover:bg-on-primary-fixed-variant"
        >
          {recommendation.actionLabel}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const client = getCurrentClient();
  const { locale } = useLocale();
  const scenario = getScenarioConfig(client.scenarioId, locale);
  const provider = getProvider(client.dataProvider);

  const { data, isLoading } = useQuery({
    queryKey: ['overview', client.clientId, scenario.scenarioId, locale],
    queryFn: () => provider.getOverviewData({ scenarioId: scenario.scenarioId, locale }),
  });

  const visibleModules = scenario.routes.filter((route) => client.enabledRoutes.includes(route.href));

  if (isLoading || !data) {
    return (
      <div className="w-full space-y-6">
        <PageHeader title={scenario.title} description={scenario.subtitle} />
        <GlassPanel className="min-h-[360px] flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-primary text-[40px] animate-spin">progress_activity</span>
            <p className="mt-3 text-sm font-label font-semibold text-on-surface-variant">{scenario.labels.loading}</p>
          </div>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-lowest border border-outline-variant/20 p-6 md:p-8 ambient-shadow">
        <div className="relative grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-label font-bold uppercase tracking-wider text-primary mb-5">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              {scenario.eyebrow}
            </div>
            <PageHeader title={scenario.title} description={scenario.subtitle} className="mb-6 max-w-4xl" />

            <div className="glass-panel rounded-2xl p-5 md:p-6 border border-white/60">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-[0_12px_24px_rgba(87,73,194,0.22)]">
                  <span className="material-symbols-outlined text-[24px] fill-icon">psychology</span>
                </div>
                <div>
                  <p className="text-xs font-label font-bold uppercase tracking-wider text-primary mb-2">
                    {scenario.labels.executiveSummary}
                  </p>
                  <h2 className="text-xl md:text-2xl font-headline font-black tracking-tight text-on-surface">
                    {data.executiveSummary.headline}
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-on-surface-variant leading-relaxed max-w-3xl">
                    {data.executiveSummary.narrative}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
            {[
              [data.executiveSummary.confidenceLabel, data.executiveSummary.confidenceValue, 'verified'],
              [data.executiveSummary.riskLabel, data.executiveSummary.riskValue, 'report'],
              [data.executiveSummary.updatedLabel, data.executiveSummary.updatedValue, 'schedule'],
            ].map(([label, value, icon]) => (
              <div key={label} className="bg-surface-container-lowest/80 border border-outline-variant/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                    data-overview-status-icon={icon}
                  >
                    <span className="material-symbols-outlined !leading-none text-[20px] flex items-center justify-center">
                      {icon}
                    </span>
                  </span>
                  <div>
                    <p className="text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant">{label}</p>
                    <p className="text-base font-headline font-bold text-on-surface">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-headline font-bold text-on-surface">{scenario.labels.kpis}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {data.kpis.map((kpi) => <KpiCard key={kpi.id} kpi={kpi} />)}
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6">
        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{scenario.labels.recommendations}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-1 gap-4">
            {data.recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                expectedImpactLabel={scenario.labels.expectedImpact}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{scenario.labels.companyContext}</h2>
          <GlassPanel className="space-y-5">
            <div>
              <p className="text-xs font-label font-bold uppercase tracking-wider text-primary mb-2">{scenario.company.industry}</p>
              <h3 className="text-2xl font-headline font-black text-on-surface">{scenario.company.name}</h3>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">{scenario.company.demoNarrative}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                [scenario.labels.contextFootprint, scenario.company.footprint],
                [scenario.labels.contextOperatingModel, scenario.company.operatingModel],
                [scenario.labels.contextDataReality, scenario.company.dataReality],
                ...data.companySignals.map((signal) => [signal.label, signal.value]),
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-surface-container-low px-4 py-3">
                  <p className="text-[11px] font-label font-bold uppercase tracking-wider text-on-surface-variant">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-on-surface">{value}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </section>
      </div>

      <section>
        <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{scenario.labels.modules}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleModules.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="group bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow hover-lift min-h-[190px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[23px]">{route.icon}</span>
                  </div>
                  {route.statusLabel && (
                    <span className="rounded-full bg-surface-container-low px-2.5 py-1 text-[11px] font-label font-bold text-on-surface-variant">
                      {route.statusLabel}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-headline font-bold text-on-surface">{route.label}</h3>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{route.description}</p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 text-sm font-label font-bold text-primary">
                <span>{route.teaser}</span>
                <span className="material-symbols-outlined text-[19px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6">
        <GlassPanel className="bg-primary text-on-primary overflow-hidden">
          <div className="relative">
            <div className="absolute right-[-40px] top-[-56px] h-36 w-36 rounded-full bg-white/15 blur-2xl" />
            <span className="material-symbols-outlined text-[34px] mb-5">picture_as_pdf</span>
            <p className="text-sm font-label font-bold uppercase tracking-wider text-white/75 mb-2">{scenario.labels.reportTeaser}</p>
            <h2 className="text-2xl font-headline font-black tracking-tight">{scenario.report.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{scenario.report.description}</p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-label font-bold text-primary shadow-sm">
              {scenario.report.actionLabel}
              <span className="material-symbols-outlined text-[18px]">file_download</span>
            </button>
          </div>
        </GlassPanel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.reportSignals.map((signal) => (
            <div key={signal.label} className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow">
              <p className="text-[11px] font-label font-bold uppercase tracking-wider text-primary mb-2">{signal.label}</p>
              <p className="text-sm font-semibold leading-relaxed text-on-surface">{signal.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
