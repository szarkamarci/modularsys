import { getDemoRetailScenario } from '../../config/scenarios/demo-retail';
import { getDemoScenario } from '../../config/scenarios/demo-cases';
import { DemoScenarioConfig } from '../../features/overview/types';

const scenarioFactories: Record<string, (locale?: string) => DemoScenarioConfig> = {
  'demo-retail': getDemoRetailScenario,
  'demo-workforce': (locale?: string) => getDemoScenario('demo-workforce', locale),
  'demo-sales': (locale?: string) => getDemoScenario('demo-sales', locale),
  'demo-operations': (locale?: string) => getDemoScenario('demo-operations', locale),
};

export function getScenarioConfig(scenarioId: string, locale?: string): DemoScenarioConfig {
  const scenarioFactory = scenarioFactories[scenarioId];
  if (!scenarioFactory) {
    throw new Error(`Scenario configuration not found for: ${scenarioId}`);
  }
  return scenarioFactory(locale);
}

export function getRouteConfigMap(scenario: DemoScenarioConfig) {
  return new Map(scenario.routes.map((route) => [route.href, route]));
}
