import { ClientConfig } from '../../lib/clients/types';

export const portosClient: ClientConfig = {
  clientId: 'portos',
  displayName: 'Portos',
  brandLabel: 'MODULARAI-PORTOS',
  logoText: 'P',
  defaultRoute: '/inventory',
  enabledRoutes: ['/inventory', '/search-analytics', '/insights', '/frequent-items', '/watchlist'],
  dataProvider: 'portos-live',
  scenarioId: 'demo-retail',
};
