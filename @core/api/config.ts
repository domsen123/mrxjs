import type { ApplicationConfig } from '@mrx/types';

const __config: ApplicationConfig = {
  isDefault: true,
  isDev: true,
  mode: 'development',
  port: '1337',
  host: 'localhost',
  log_level: 'debug',
  api_prefix: '/_api',
  secret: '!L0v3G!nW!tHs0m3T0n!c_AndB33r0fC0urs3',
};

export const setApplicationConfig = (cfg: Partial<ApplicationConfig> = {}) => {
  __config.isDefault = false;
  Object.entries(cfg).forEach(([k, v]) => {
    if (v) __config[k] = v;
  });
};

export const getApplicationConfig = (safe = true): ApplicationConfig => {
  // fresh copy of config
  const config: ApplicationConfig = JSON.parse(JSON.stringify(__config));
  if (config.isDefault)
    console.warn(`Config isn't set by cli yet! You are using default config!`);

  if (safe) Reflect.deleteProperty(config, 'secret');
  return config;
};
