import { demoClient } from '../../config/clients/demo';
import { portosClient } from '../../config/clients/portos';
import { ClientConfig } from './types';

const clients: Record<string, ClientConfig> = {
  demo: demoClient,
  portos: portosClient,
};

export function getClientConfig(clientId: string): ClientConfig {
  const config = clients[clientId];
  if (!config) {
    throw new Error(`Client configuration not found for: ${clientId}`);
  }
  return config;
}
