
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { PageHeader } from '../../components/ui/PageHeader';
import { PremiumInput } from '../../components/ui/PremiumInput';
import { StatusChip } from '../../components/ui/StatusChip';
import { getCurrentClient } from '../../lib/clients/getCurrentClient';
import { getProvider } from '../../lib/data/providerRegistry';
import { ProductInsightData } from '../../lib/data/types';
import { useLocale } from '../../lib/locales/LocaleProvider';

function CrossSellCard({ item }: { item: ProductInsightData['products'][number]['crossSell'][number] }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 soft-shadow hover-lift">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-xs font-mono font-bold text-primary whitespace-nowrap">{item.id}</p>
          <h3 className="text-base font-headline font-bold text-on-surface truncate mt-1" title={item.name}>{item.name}</h3>
        </div>
        <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-label font-black text-on-primary-fixed-variant whitespace-nowrap">
          {item.attachRate}
        </span>
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed">{item.reason}</p>
      <div className="mt-4 rounded-xl bg-surface-container-low px-4 py-3">
        <p className="text-sm font-semibold text-on-surface">{item.action}</p>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const client = getCurrentClient();
  const provider = getProvider(client.dataProvider);
  const { locale } = useLocale();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['product-insights', client.clientId, locale],
    queryFn: () => provider.getProductInsights({ locale }),
  });

  const products = data?.products || [];
  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) => (
      product.id.toLowerCase().includes(normalized) ||
      product.name.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized)
    ));
  }, [products, query]);

  const selectedProduct = products.find((product) => product.id === selectedId) || filteredProducts[0] || products[0];

  if (isLoading || !data || !selectedProduct) {
    return (
      <GlassPanel className="min-h-[320px] flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
      </GlassPanel>
    );
  }

  return (
    <div className="w-full space-y-6">
      <PageHeader title={data.title} description={data.description} />

      <div className="grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] gap-6">
        <section className="space-y-4">
          <GlassPanel className="space-y-4">
            <PremiumInput
              iconName="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={data.labels.searchPlaceholder}
            />
            <div className="space-y-2 max-h-[430px] overflow-y-auto pr-1">
              {filteredProducts.map((product) => {
                const isActive = product.id === selectedProduct.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setSelectedId(product.id)}
                    className={`w-full text-left rounded-2xl border p-4 transition-colors ${
                      isActive
                        ? 'bg-primary-fixed/60 border-primary/20'
                        : 'bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined !leading-none text-[20px]">inventory_2</span>
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-mono font-bold text-primary whitespace-nowrap">{product.id}</span>
                        <span className="block text-sm font-headline font-bold text-on-surface truncate mt-1" title={product.name}>{product.name}</span>
                        <span className="block text-xs text-on-surface-variant mt-1">{product.category}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </GlassPanel>
        </section>

        <section className="space-y-6 min-w-0">
          <GlassPanel className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-label font-bold uppercase tracking-wider text-primary mb-2">{data.labels.selectedProduct}</p>
                <p className="text-sm font-mono font-black text-primary whitespace-nowrap">{selectedProduct.id}</p>
                <h2 className="text-2xl font-headline font-black text-on-surface truncate mt-1" title={selectedProduct.name}>{selectedProduct.name}</h2>
              </div>
              <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-label font-bold text-on-surface-variant w-max">
                {selectedProduct.category}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-headline font-bold text-on-surface mb-3">{data.labels.metrics}</h3>
              <div className="flex flex-wrap gap-3">
                <StatusChip label="Sales" value={selectedProduct.weeklySales} bgClass="bg-primary-fixed" textClass="text-on-primary-fixed-variant" numClass="text-primary" />
                <StatusChip label="Trend" value={selectedProduct.trend} />
                <StatusChip label="Stock" value={selectedProduct.stock} />
                <StatusChip label="Margin" value={selectedProduct.margin} />
              </div>
            </div>

            <div className="rounded-2xl bg-surface-container-low p-5">
              <p className="text-xs font-label font-bold uppercase tracking-wider text-primary mb-2">{data.labels.explanation}</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">{selectedProduct.explanation}</p>
            </div>
          </GlassPanel>

          <section>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-4">{data.labels.crossSell}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedProduct.crossSell.map((item) => <CrossSellCard key={item.id} item={item} />)}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
