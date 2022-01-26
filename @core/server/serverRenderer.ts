import type { IncomingMessage, ServerResponse } from 'http';
import { createSsrServer } from '@mrx/entry';
import middie from 'middie';
import { getViteConfig } from '@mrx/server/vite.config';
import type { FastifyInstance } from 'fastify';
import type { ApplicationConfig } from '@mrx/types';
import { getLogger } from './serverLogger';
import type { NextFunction } from './types';

export const createSsrRenderer = async (
  server: FastifyInstance,
  config: ApplicationConfig,
): Promise<void> => {
  const isDev = true;
  await server.register(middie);

  if (isDev) {
    server.log.info(`Setting up development Server ...`);
    const viteConfig = await getViteConfig({
      mode: config.mode,
      server: {
        middlewareMode: 'ssr',
        fs: { strict: false },
      },
      define: {
        __APP_CONFIG__: JSON.stringify(config),
      },
    });

    const vite = await createSsrServer(viteConfig);
    server.use(
      (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
        vite.middlewares(req, res, next);
      },
    );
  }
  getLogger().info(`✌ Renderer successfully initialized`);
};
