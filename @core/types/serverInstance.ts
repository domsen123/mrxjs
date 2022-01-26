import type {
  FastifyInstance,
  FastifyLoggerInstance,
} from '@core/server/types';

export interface ServerInstance {
  instance: FastifyInstance;
  log: FastifyLoggerInstance;
}
