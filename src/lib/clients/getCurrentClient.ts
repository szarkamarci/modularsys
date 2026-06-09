import { getClientConfig } from './clientRegistry';
import { ClientConfig } from './types';
import { getDemoScenarioRoutePaths, normalizeDemoScenarioId } from '../../config/scenarios/demo-cases';

export function getCurrentClient(): ClientConfig {
  const client = getClientConfig('demo');
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const match = pathname.match(/^\/demo-dashboard\/scenario\/([^/]+)/);
  const scenarioId = normalizeDemoScenarioId(match?.[1]);

  if (scenarioId === 'demo-retail') return client;

  const displayNames = {
    'demo-workforce': 'TalentBridge Network',
    'demo-sales': 'Atlas B2B Systems',
    'demo-operations': 'Clearline Operations Group',
  } as const;

  return {
    ...client,
    displayName: displayNames[scenarioId],
    enabledRoutes: getDemoScenarioRoutePaths(scenarioId),
    scenarioId,
  };
}
