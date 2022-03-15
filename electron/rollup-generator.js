import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';

// 与 rollup 相关的 ts 配置
// 1. 必须配置 rootDir，否则报 rollup Note that you need plugins to import files that are not JavaScript
// 2. 必须配置 plugin-json，否则报 rollup Note that you need plugins to import files that are not JavaScript
// 3. 必须配置 tsconfig.json resolveJsonModule: true
// 4. 必须配置 tsconfig.json module: esnext
// 5. 必须配置 tsconfig.json moduleResolution: "node"

/**
 * @param {string} input './src/main.ts'
 */
export default ({ input }) => {
  const filename = path.basename(input).slice(0, -path.extname(input).length); // main
  return {
    input,
    output: {
      file: `dist/${filename}.js`,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      typescript(),
      json(),
      babel({ babelHelpers: 'bundled' }),
    ],
  };
};
