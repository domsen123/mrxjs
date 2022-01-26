import path from 'path';
import { createRequire } from 'module';
import tsNode from 'ts-node';
import moduleAlias from 'module-alias';

const require = createRequire(import.meta.url);
const cwd = () => process.env.MRX_CWD || process.cwd();

export const transpiler = async () => {
  /**
   * Use UTC time to prevent differences between local and live envs
   */
  process.env.TZ = 'utc';
  /**
   * Allow Node to process TypeScript
   */
  const transpileModules = ['@mrx', '.*mrx', '.pnpm'];
  tsNode.register({
    transpileOnly: true,
    compilerOptions: {
      strict: false,
      allowJs: true,
      resolveJsonModule: true,
      moduleResolution: 'node',
      module: 'ESNext',
      target: 'ES2020',
      esModuleInterop: true,
    },
    ignore: [
      `node_modules/(?!(${transpileModules.join('|')}))`,
      `node_modules/.pnpm/(?!(${transpileModules.join('|')}))`,
    ],
  });

  /**
   * Add needed workflow aliases
   * Alias: @src - Application source
   * Alias: @cwd - Current working directory
   */

  const primaryPackage = path.resolve(cwd(), 'package.json');
  const { main = 'index.js' } = require(primaryPackage);

  moduleAlias.addAlias('@src', () => path.dirname(path.resolve(cwd(), main)));
  moduleAlias.addAlias('@cwd', () => cwd());
};
