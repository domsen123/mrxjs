import type { NodeEnv } from './environment';

export interface ApplicationConfig {
  [key: string]: string | boolean;
  isDefault: boolean;
  isDev: boolean;
  mode: NodeEnv;
  port: string;
  host: string;
  log_level: string;
  api_prefix: string;
  secret: string;
}
