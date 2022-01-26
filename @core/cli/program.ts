import { resolve } from 'path';
import { cwd, getApplicationConfig, setApplicationConfig } from '@mrx/api';
import { Command } from 'commander';
import dotenv from 'dotenv';
import type { NodeEnv } from '@mrx/types';
import { setup } from '@mrx/server/serverMain';
import pkg from './package.json';
import type { CommandOptions, WrapCommandSettings } from './types';

const commander = new Command();

const startServer = async (): Promise<void> => {
  const config = getApplicationConfig();

  await setup({ config });
};

const restartInitializer = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  await startServer();
};

const setConfig = (node_env: NodeEnv, options: CommandOptions): void => {
  process.env.NODE_ENV = node_env;
  const env = options.environment ?? node_env;

  const envFile =
    env === 'development'
      ? '.dev.env'
      : env === 'staging'
      ? '.test.env'
      : '.env';

  const envPath = resolve(cwd(), envFile);
  const envFound = dotenv.config({ path: envPath });

  if (envFound.error) throw new Error(`⚠️  Couldn't find ${envFile} file  ⚠️`);

  // config vars
  const isDev = node_env === 'development';
  const mode = env;
  const port = process.env.PORT ?? options.port ?? undefined;
  const host = process.env.HOST ?? options.host ?? undefined;
  const log_level = process.env.LOG_LEVEL ?? undefined;
  const api_prefix = process.env.API_PREFIX ?? undefined;
  const secret = process.env.SECRET ?? undefined;

  setApplicationConfig({
    isDev,
    mode,
    port,
    host,
    log_level,
    api_prefix,
    secret,
  });
};

const wrapCommand = async (settings: WrapCommandSettings): Promise<void> => {
  const { node_env = 'development', cb, options } = settings;
  setConfig(node_env, options);
  try {
    await cb();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const execute = async () => {
  commander.version(pkg.version).description('@mrx/cli');

  commander
    .command('dev')
    .option('-e, --environment <environment>', 'Set Application Environment')
    .option('-p, --port <port>', 'Set Application Port')
    .option('-h, --host <host>', 'Set Application Host')
    .action((options: CommandOptions) =>
      wrapCommand({
        node_env: 'development',
        cb: restartInitializer,
        options,
      }),
    );

  commander
    .command('start')
    .option('-e, --environment <environment>', 'Set Application Environment')
    .option('-p, --port <port>', 'Set Application Port')
    .option('-h, --host <host>', 'Set Application Host')
    .action((options: CommandOptions) =>
      wrapCommand({
        node_env: 'production',
        cb: startServer,
        options,
      }),
    );
  try {
    commander.parse(process.argv);
  } catch (error: any) {
    throw new Error(error);
  }
};
