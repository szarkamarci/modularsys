
import { useQuery } from '@tanstack/react-query';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusChip } from '../../components/ui/StatusChip';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getProvider } from '../../lib/data/providerRegistry';
import { FrequentItemPair } from '../../lib/data/types';
import { useLocale } from '../../lib/locales/LocaleProvider';

function FrequentPairCard({
  pair,
  labels,
}: {
  pair: FrequentItemPair;
  labels: {
    support: string;
    confidence: string;
    lift: string;
    revenuePotential: string;
  };
}) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow hover-lift min-w-0">
      <div className="flex items-center gap-3 mb-5 min-w-0">
        <div className="min-w-0 flex-1 rounded-xl bg-primary/10 px-4 py-3">
          <p className="text-sm font-headline font-bold text-primary truncate" title={pair.leftProduct}>{pair.leftProduct}</p>
        </div>
        <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
          <span className="material-symbols-outlined !leading-none text-[18px]">add</span>
        </span>
        <div className="min-w-0 flex-1 rounded-xl bg-secondary-container/40 px-4 py-3">
          <p className="text-sm font-headline font-bold text-secondary truncate" title={pair.rightProduct}>{pair.rightProduct}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <StatusChip label={labels.support} value={pair.support} className="!rounded-xl !px-3 !py-2 justify-between" />
        <StatusChip label={labels.confidence} value={pair.confidence} className="!rounded-xl !px-3 !py-2 justify-between" />
        <StatusChip label={labels.lift} value={pair.lift} className="!rounded-xl !px-3 !py-2 justify-between" />
        <StatusChip label={labels.revenuePotential} value={pair.revenuePotential} bgClass="bg-primary-fixed" textClass="text-on-primary-fixed-variant" numClass="text-primary" className="!rounded-xl !px-3 !py-2 justify-between" />
      </div>

      <div className="rounded-xl bg-surface-container-low px-4 py-3">
        <p className="text-sm text-on-surface-variant leading-relaxed">{pair.recommendation}</p>
      </div>
    </div>
  );
}

export default function FrequentItemsPage() {
  const client = getCurrentClient();
  const provider = getProvider(client.dataProvider);
  const { locale } = useLocale();

  const { data, isLoading } = useQuery({
    queryKey: ['frequent-items', client.clientId, locale],
    queryFn: () => provider.getFrequentItems({ locale }),
  });

  if (isLoading || !data) {
    return (
      <GlassPanel className="min-h-[320px] flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
      </GlassPanel>
    );
  }

  return (
    <div className="w-full space-y-6">
      <PageHeader title={data.title} description={data.description} />

      <section>
        <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.pairs}</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {data.pairs.map((pair) => (
            <FrequentPairCard key={pair.id} pair={pair} labels={data.labels} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.opportunities}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.opportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow">
              <span className="material-symbols-outlined text-primary text-[24px] mb-4">local_offer</span>
              <h3 className="text-base font-headline font-bold text-on-surface">{opportunity.title}</h3>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{opportunity.description}</p>
              <p className="text-sm font-semibold text-primary mt-4">{opportunity.impact}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.network}</h2>
        <GlassPanel className="overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.networkNodes.map((node) => (
              <div
                key={node.id}
                className="min-w-0 rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4 text-center"
              >
                <div
                  className="mx-auto mb-3 rounded-full bg-primary/10 text-primary flex items-center justify-center"
                  style={{ width: 34 + node.weight * 5, height: 34 + node.weight * 5 }}
                >
                  <span className="material-symbols-outlined !leading-none text-[20px]">hub</span>
                </div>
                <p className="text-sm font-headline font-bold text-on-surface truncate" title={node.label}>{node.label}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}
