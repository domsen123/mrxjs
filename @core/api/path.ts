import { dirname, join, resolve } from 'path';
import { createRequire } from 'module';
import fs from 'fs';

const require = createRequire(import.meta.url);

export const cwd = (): string => process.cwd();
export const packagePath = (): string => resolve(cwd(), 'package.json');
export const mainFile = (): string => {
  const pkg = require(packagePath());
  return pkg.main ?? 'index';
};

export const sourceFolder = (): string => dirname(resolve(cwd(), mainFile()));
export const distFolder = (): string => join(cwd(), 'dist');
export const distServer = (): string => join(distFolder(), 'server');
export const distClient = (): string => join(distFolder(), 'client');
export const resolveCwd = (p: string): string => resolve(cwd(), p);
export const resolveSrc = (p: string): string => resolve(sourceFolder(), p);
export const resolveDist = (p: string): string => resolve(distFolder(), p);
/**
 * Require a path if it exists and silence any not found errors if it doesn't
 */
export const importIfExists = async <T = unknown>(
  mod: string,
): Promise<T | undefined> => {
  if (fs.existsSync(mod)) {
    return await import(mod);
  }
};
