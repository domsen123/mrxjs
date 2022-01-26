import type { FastifyLoggerInstance } from 'fastify';

let __logger: FastifyLoggerInstance;

export const setLoggerInstance = (logger: FastifyLoggerInstance): void => {
  __logger = logger;
};

export const getLogger = (): FastifyLoggerInstance => {
  return __logger;
};
