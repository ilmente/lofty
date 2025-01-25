import { join } from 'path';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: join(__dirname, 'src/Api.ts'),
  output: {
    file: 'dist/react-bem.cjs',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      outputToFilesystem: true,
    }),
    terser(),
  ],
  external: ['react', 'path'],
};
