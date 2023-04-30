const path = require('path')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const nodeResolve = require('@rollup/plugin-node-resolve')
const typescript = require('rollup-plugin-typescript2')
const replace = require('@rollup/plugin-replace')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const isProd = process.env.NODE_ENV === 'production'

/**
 * 生成 common conf
 * @param {string} format 'umd' 'esm'
 * @returns common conf
 */
function genCommonConf(format) {
  return {
    input: path.resolve(process.cwd(), './src/index.ts'),
    output: {
      // 属性有 file format name sourcemap 等
      // https://www.rollupjs.com/guide/big-list-of-options
    },
    plugins: [
      peerDepsExternal(), // 打包结果不包含 package.json 的 peerDependencies
      json({
        compact: true,
        indent: '  ',
        preferConst: true,
      }),
      typescript({
        clean: true,
        tsconfig: path.resolve(process.cwd(), './tsconfig.json'),
      }),
      nodeResolve({
        browser: true, // 重要
        mainFields: format === 'esm' ? ['module', 'main'] : ['main'],
        extensions,
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        preventAssignment: true,
      }),
      // del({ targets: 'dist/*' }),
    ],
  }
}

module.exports = {
  extensions,
  genCommonConf,
}
