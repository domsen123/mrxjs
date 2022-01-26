import type { NodeEnv } from '@mrx/types';

export interface CommandOptions {
  environment?: NodeEnv;
  port?: string;
  host?: string;
}

export interface WrapCommandSettings {
  node_env: NodeEnv;
  cb: () => Promise<void>;
  options: CommandOptions;
}
