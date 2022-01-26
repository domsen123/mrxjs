import { createServerInstance } from './serverInstance';
import { createSsrRenderer } from './serverRenderer';
import type { SetupServerOptions } from './types';

export const setup = async ({ config }: SetupServerOptions) => {
  const { instance: server, log } = createServerInstance();

  await createSsrRenderer(server, config);

  try {
    await server.listen(1337);
  } catch (e: any) {
    log.error(e.message);
  }
};
