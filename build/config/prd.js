/**
 * @description rollup prd config
 * @author wangfupeng
 */

const babel = require('@rollup/plugin-babel')
const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const rollupPluginTerser = require('rollup-plugin-terser')
const cleanup = require('rollup-plugin-cleanup')
const common = require('./common')

const { terser } = rollupPluginTerser
const { extensions, genCommonConf } = common

/**
 * 生成 prd config
 * @param {string} format 'umd' 'esm'
 */
function genPrdConf(format) {
  const { input, output = {}, plugins = [], external } = genCommonConf(format)

  const finalPlugins = [
    ...plugins,
    babel({
      rootMode: 'upward',
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      include: 'src/**',
      extensions,
    }),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano(), // 压缩 css
      ],
      extract: 'css/style.css',
    }),
    cleanup({
      comments: 'none',
      extensions: ['.ts', '.tsx'],
    }),
    terser(), // 压缩 js
  ]

  return {
    input,
    output: {
      sourcemap: true,
      ...output,
    },
    external,
    plugins: finalPlugins,
  }
}

module.exports = genPrdConf
