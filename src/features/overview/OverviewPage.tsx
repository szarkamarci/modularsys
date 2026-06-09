import { useState } from 'react';
import { Link } from 'react-router-dom';
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
          to={recommendation.route}
          className="inline-flex w-max items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-label font-bold text-on-primary transition hover:bg-on-primary-fixed-variant"
        >
          {recommendation.actionLabel}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

function AssistantChat({ assistant }: { assistant: NonNullable<OverviewData['assistant']> }) {
  const isHu = assistant.status.toLowerCase().includes('asszisztens');
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: assistant.greeting },
    { role: 'assistant', text: assistant.note },
  ]);

  const addPrompt = (question: string, answer: string) => {
    setOpen(true);
    setMessages((current) => [
      ...current,
      { role: 'user', text: question },
      { role: 'assistant', text: answer },
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;

    setMessages((current) => [
      ...current,
      { role: 'user', text: question },
      {
        role: 'assistant',
        text: isHu
          ? 'Ez most bemutató mód, ezért előre megírt válaszokkal dolgozom. A lényeg: megmutatni, hogyan lesz a szétszórt adatokból érthető vezetői kép és konkrét teendő.'
          : 'This demo uses prepared responses: ModularAI shows how scattered data becomes KPIs, risk signals, recommendations, and a management-ready summary.',
      },
    ]);
    setDraft('');
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 bottom-24 md:left-6 md:bottom-6 z-50 flex items-center gap-3 rounded-full bg-surface-container-lowest border border-outline-variant/20 px-4 py-3 shadow-[0_18px_48px_rgba(87,73,194,0.18)] hover:-translate-y-0.5 transition-all"
      >
        <img src="/assets/chatbot_icon.svg" alt="" className="h-9 w-9" />
        <span className="hidden sm:block text-sm font-label font-black text-on-surface">
          {isHu ? 'Kérdezze az elemzőt' : 'Ask the analyst'}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed left-4 bottom-24 md:left-6 md:bottom-6 z-50 w-[calc(100vw-2rem)] max-w-[390px] rounded-3xl bg-surface-container-lowest border border-outline-variant/20 shadow-[0_24px_80px_rgba(25,28,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-outline-variant/10 px-4 py-3 bg-surface-container-lowest/95">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <img src="/assets/chatbot_thinking.svg" alt="" className="h-10 w-10" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-label font-bold uppercase tracking-wider text-primary">{assistant.status}</p>
            <h2 className="text-base font-headline font-black text-on-surface truncate">{assistant.title}</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="h-9 w-9 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
          aria-label={isHu ? 'Chat bezárása' : 'Close chat'}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div className="max-h-[360px] overflow-y-auto px-4 py-4 space-y-3 bg-surface">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest border border-outline-variant/15 text-on-surface-variant'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-outline-variant/10 bg-surface-container-lowest">
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {assistant.prompts.map((prompt) => (
            <button
              key={prompt.question}
              type="button"
              onClick={() => addPrompt(prompt.question, prompt.answer)}
              className="shrink-0 rounded-full bg-surface-container-low px-3 py-2 text-xs font-label font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              {prompt.question}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={isHu ? 'Írjon egy rövid kérdést...' : 'Ask a short question...'}
            className="min-w-0 flex-1 rounded-full bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none border border-outline-variant/10 focus:border-primary/40"
          />
          <button
            type="submit"
            className="h-11 w-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            aria-label={isHu ? 'Küldés' : 'Send'}
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-lg md:text-xl font-headline font-bold text-on-surface">{title}</h2>
      </div>
      {children}
    </section>
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

      <DemoSection title={scenario.labels.kpis}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {data.kpis.map((kpi) => <KpiCard key={kpi.id} kpi={kpi} />)}
        </div>
      </DemoSection>

      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6">
        <DemoSection title={scenario.labels.recommendations}>
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-1 gap-4">
            {data.recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                expectedImpactLabel={scenario.labels.expectedImpact}
              />
            ))}
          </div>
        </DemoSection>

        <DemoSection title={scenario.labels.companyContext}>
          <GlassPanel className="space-y-5">
            <div>
              <p className="text-xs font-label font-bold uppercase tracking-wider text-primary mb-2">{scenario.company.industry}</p>
              <h3 className="text-2xl font-headline font-black text-on-surface">{scenario.company.name}</h3>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">{scenario.company.demoNarrative}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
              {[
                [scenario.labels.contextFootprint, scenario.company.footprint],
                [scenario.labels.contextOperatingModel, scenario.company.operatingModel],
                ...data.companySignals.map((signal) => [signal.label, signal.value]),
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-surface-container-low px-4 py-3">
                  <p className="text-[11px] font-label font-bold uppercase tracking-wider text-on-surface-variant">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-on-surface">{value}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </DemoSection>
      </div>

      {visibleModules.length > 1 && (
        <DemoSection title={scenario.labels.modules}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleModules.map((route) => (
              <Link
                key={route.href}
                to={route.href}
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
        </DemoSection>
      )}

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

      {data.assistant && <AssistantChat assistant={data.assistant} />}
    </div>
  );
}
