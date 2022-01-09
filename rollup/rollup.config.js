import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-postcss';

const production = process.env.NODE_ENV === 'production';

export default {
  input: './src/index.tsx',
  output: [
    {
      file: './public/bundle.js',
      format: 'iife',
      sourcemap: !production,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    css({
      minimise: production,
    }),
  ]
};
