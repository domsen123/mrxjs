import { createRequire } from 'module';
import { dirname } from 'path';
import { mergeConfig, viteSsr, vue, vuetify } from '@mrx/entry';
import { type InlineConfig } from '@mrx/types';

const require = createRequire(import.meta.url);

export const getViteConfig = (optional: InlineConfig = {}): InlineConfig => {
  const root = dirname(require.resolve('@mrx/entry'));
  const base: InlineConfig = {
    root,
    server: {
      middlewareMode: 'ssr',
      fs: { strict: false },
    },
    plugins: [
      vue(),
      viteSsr({
        // excludeSsrComponents: [/^vuetify/],
      }),
      vuetify({ autoImport: true }),
    ],
    optimizeDeps: {
      include: ['vue', 'vue-router', 'vuetify'],
    },
  };

  return mergeConfig(base, optional);
};
