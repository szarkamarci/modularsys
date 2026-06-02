
import { useQuery } from '@tanstack/react-query';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { MetricCard } from '../../components/ui/MetricCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getProvider } from '../../lib/data/providerRegistry';
import { useLocale } from '../../lib/locales/LocaleProvider';
import { SearchAnalyticsData } from '../../lib/data/types';

const toneConfig: Record<SearchAnalyticsData['summary'][number]['tone'], {
  iconBg: string;
  iconText: string;
  badge: string;
}> = {
  primary: { iconBg: 'bg-primary/10', iconText: 'text-primary', badge: 'text-primary bg-primary-fixed/70' },
  warning: { iconBg: 'bg-[#fff4cf]', iconText: 'text-[#9a6100]', badge: 'text-[#9a6100] bg-[#fff4cf]' },
  danger: { iconBg: 'bg-error-container/60', iconText: 'text-error', badge: 'text-error bg-error-container/40' },
  success: { iconBg: 'bg-[#dff7e7]', iconText: 'text-[#1d6b3a]', badge: 'text-[#1d6b3a] bg-[#dff7e7]' },
};

function LoadingState() {
  return (
    <GlassPanel className="min-h-[320px] flex items-center justify-center">
      <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
    </GlassPanel>
  );
}

export default function SearchAnalyticsPage() {
  const client = getCurrentClient();
  const provider = getProvider(client.dataProvider);
  const { locale } = useLocale();

  const { data, isLoading } = useQuery({
    queryKey: ['search-analytics', client.clientId, locale],
    queryFn: () => provider.getSearchAnalytics({ locale }),
  });

  if (isLoading || !data) return <LoadingState />;

  return (
    <div className="w-full space-y-6">
      <PageHeader title={data.title} description={data.description} />

      <GlassPanel className="border border-primary/10">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-2xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[23px]">tips_and_updates</span>
          </div>
          <div>
            <p className="text-xs font-label font-bold uppercase tracking-wider text-primary mb-2">{data.labels.conversionRisk}</p>
            <p className="text-base text-on-surface-variant leading-relaxed max-w-4xl">{data.explanation}</p>
          </div>
        </div>
      </GlassPanel>

      <section>
        <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.summary}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {data.summary.map((item) => {
            const tone = toneConfig[item.tone];
            return (
              <MetricCard
                key={item.id}
                iconName={item.icon}
                iconBgClass={tone.iconBg}
                iconClass={tone.iconText}
                title={item.label}
                value={item.value}
                subtitle={item.caption}
                badgeText={data.labels.searches}
                badgeClass={tone.badge}
              />
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.failedSearches}</h2>
          <div className="space-y-3">
            {data.failedSearches.map((search) => (
              <div key={search.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-full bg-error-container/60 px-3 py-1 text-xs font-label font-bold text-on-error-container">
                        {search.count} {data.labels.searches}
                      </span>
                      <span className="text-xs text-on-surface-variant font-label">{search.lastSeen}</span>
                    </div>
                    <h3 className="text-lg font-headline font-bold text-on-surface truncate">{search.query}</h3>
                    <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{search.likelyIntent}</p>
                  </div>
                  <div className="md:max-w-xs rounded-xl bg-surface-container-low px-4 py-3">
                    <p className="text-[11px] font-label font-bold uppercase tracking-wider text-primary mb-1">AI match</p>
                    <p className="text-sm font-semibold text-on-surface leading-relaxed">{search.suggestedMatch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.missingDemand}</h2>
          <div className="space-y-4">
            {data.demandInsights.map((insight) => (
              <div key={insight.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow hover-lift">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <StatusBadge label={insight.status} badgeClass="bg-primary-fixed text-on-primary-fixed-variant" dotClass="bg-primary" />
                  <span className="text-sm font-headline font-black text-primary">{insight.confidence}</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-on-surface">{insight.title}</h3>
                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{insight.description}</p>
                <div className="mt-4 rounded-xl bg-surface-container-low px-4 py-3">
                  <p className="text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant">Revenue</p>
                  <p className="text-lg font-headline font-black text-on-surface">{insight.estimatedRevenue}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section>
        <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.actions}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.actions.map((action) => (
            <div key={action.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow">
              <span className="material-symbols-outlined text-primary text-[24px] mb-4">arrow_circle_right</span>
              <h3 className="text-base font-headline font-bold text-on-surface">{action.title}</h3>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{action.description}</p>
              <p className="text-sm font-semibold text-primary mt-4">{action.impact}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
