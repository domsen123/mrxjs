import type { ServerInstance } from '@mrx/types';
import fastify from 'fastify';
import { setLoggerInstance } from './serverLogger';
export const createServerInstance = (): ServerInstance => {
  const instance = fastify({
    logger: {
      prettyPrint: {
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
    disableRequestLogging: true,
  });

  setLoggerInstance(instance.log);

  const log = instance.log;
  return { instance, log };
};
