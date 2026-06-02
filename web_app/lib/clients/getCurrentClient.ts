import { getClientConfig } from './clientRegistry';
import { ClientConfig } from './types';

export function getCurrentClient(): ClientConfig {
  // For the first slice, hardcode to 'demo'. 
  // Later we can infer this from URL subdomains, cookies, or headers.
  return getClientConfig('demo');
}
