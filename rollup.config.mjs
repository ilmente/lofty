import { join } from 'path';
import { dependencies } from './package.json';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const isProduction = Boolean(process.env.PRODUCTION);

function getPlugins() {
  const plugins = [
    typescript({
      tsconfig: './tsconfig.json',
      outputToFilesystem: true,
      include: ['src/**/*', 'example/**/*'],
    }),
  ];

  isProduction && plugins.push(terser());

  return plugins;
}

export default {
  plugins: getPlugins(),
  input: join(__dirname, 'src/Api.ts'),
  output: {
    file: 'dist/lofty.cjs',
    format: 'cjs',
    sourcemap: true,
  },
  external: [...Object.keys(dependencies), 'path'],
};
