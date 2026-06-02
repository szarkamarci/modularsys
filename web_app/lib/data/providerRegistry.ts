import { DashboardDataProvider } from './DashboardDataProvider';
import { demoMockProvider } from './providers/demoMockProvider';
import { portosLiveProvider } from './providers/portosLiveProvider';

const providers: Record<string, DashboardDataProvider> = {
  'demo-mock': demoMockProvider,
  'portos-live': portosLiveProvider,
};

export function getProvider(providerKey: string): DashboardDataProvider {
  const provider = providers[providerKey];
  if (!provider) {
    throw new Error(`Data provider not found: ${providerKey}`);
  }
  return provider;
}
