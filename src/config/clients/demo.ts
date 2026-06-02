import { ClientConfig } from '../../lib/clients/types';
import { demoRetailRoutePaths } from '../scenarios/demo-retail';

export const demoClient: ClientConfig = {
  clientId: 'demo',
  displayName: 'Northstar Retail Supply',
  brandLabel: 'ModularAI',
  logoText: 'MA',
  defaultRoute: '/',
  enabledRoutes: demoRetailRoutePaths,
  dataProvider: 'demo-mock',
  scenarioId: 'demo-retail',
};
