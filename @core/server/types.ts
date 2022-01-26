import type { ApplicationConfig } from '@mrx/types';

export type { FastifyInstance, FastifyLoggerInstance } from 'fastify';
export type NextFunction = (err?: any) => void;

export interface SetupServerOptions {
  config: ApplicationConfig;
}
