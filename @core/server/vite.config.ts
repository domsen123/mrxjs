import { createRequire } from 'module';
import { dirname } from 'path';
import { mergeConfig } from '@mrx/entry';
import { type InlineConfig } from '@mrx/types';
import vue from '@vitejs/plugin-vue';
import viteSsr from 'vite-ssr/plugin';

const require = createRequire(import.meta.url);

export const getViteConfig = (optional: InlineConfig = {}): InlineConfig => {
  const root = dirname(require.resolve('@mrx/entry'));
  const base: InlineConfig = {
    root,
    plugins: [vue(), viteSsr()],
    optimizeDeps: {
      include: ['vue', 'vue-router'],
    },
  };

  return mergeConfig(base, optional);
};
