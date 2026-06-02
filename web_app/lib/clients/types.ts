export type ClientTheme = {
  primary?: string;
  surface?: string;
};

export type ClientConfig = {
  clientId: string;
  displayName: string;
  brandLabel: string;
  logoText?: string;
  theme?: ClientTheme;
  defaultRoute: string;
  enabledRoutes: string[];
  dataProvider: 'demo-mock' | 'portos-live';
  scenarioId: string;
};
