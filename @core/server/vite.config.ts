import { createRequire } from 'module';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { AutoImport, mergeConfig, viteSsr, vue } from '@mrx/entry';
import { type InlineConfig } from '@mrx/types';
import { cwd, sourceFolder } from '@mrx/api';

const require = createRequire(import.meta.url);

export const getViteConfig = (optional: InlineConfig = {}): InlineConfig => {
  const appSrc = sourceFolder();

  const root = dirname(require.resolve('@mrx/entry'));
  const base: InlineConfig = {
    root,
    server: {
      middlewareMode: 'ssr',
      fs: { strict: false },
    },
    resolve: {
      alias: {
        '@src': appSrc,
        '@cwd': cwd(),
        '@entry': root,
        '@alias/app': root,
      },
    },
    plugins: [
      vue(),
      viteSsr(),
      AutoImport({
        imports: ['vue', 'vue-router'],
      }),
      {
        name: 'resolveApp',
        resolveId: (source: string): string | null => {
          const match = source.match(/@alias\/app(.*)/);

          if (match) {
            const file = match[1] ?? '';

            const appFile = join(sourceFolder(), file);

            const actualFile = existsSync(appFile) ? appFile : join(root, file);

            return actualFile;
          } else return null;
        },
      },
    ],
    optimizeDeps: {
      include: ['vue', 'vue-router', 'ant-design-vue', 'vite-ssr'],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };

  return mergeConfig(base, optional);
};
