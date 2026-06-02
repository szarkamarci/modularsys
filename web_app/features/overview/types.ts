export type OverviewTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export type ScenarioRouteConfig = {
  href: string;
  label: string;
  navLabel?: string;
  mobileLabel?: string;
  description: string;
  icon: string;
  keywords: string[];
  statusLabel?: string;
  teaser?: string;
};

export type DemoScenarioConfig = {
  scenarioId: string;
  clientId: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  company: {
    name: string;
    industry: string;
    footprint: string;
    operatingModel: string;
    dataReality: string;
    demoNarrative: string;
  };
  labels: {
    executiveSummary: string;
    kpis: string;
    recommendations: string;
    modules: string;
    reportTeaser: string;
    companyContext: string;
    loading: string;
    expectedImpact: string;
    contextFootprint: string;
    contextOperatingModel: string;
    contextDataReality: string;
  };
  routes: ScenarioRouteConfig[];
  report: {
    title: string;
    description: string;
    actionLabel: string;
  };
};

export type OverviewKpi = {
  id: string;
  label: string;
  value: string;
  caption: string;
  trend: string;
  icon: string;
  tone: OverviewTone;
};

export type OverviewRecommendation = {
  id: string;
  title: string;
  description: string;
  impact: string;
  urgency: 'High' | 'Medium' | 'Low';
  actionLabel: string;
  route: string;
};

export type OverviewData = {
  executiveSummary: {
    headline: string;
    narrative: string;
    confidenceLabel: string;
    confidenceValue: string;
    updatedLabel: string;
    updatedValue: string;
    riskLabel: string;
    riskValue: string;
  };
  kpis: OverviewKpi[];
  recommendations: OverviewRecommendation[];
  companySignals: Array<{
    label: string;
    value: string;
  }>;
  reportSignals: Array<{
    label: string;
    value: string;
  }>;
};
