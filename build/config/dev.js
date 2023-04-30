const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const common = require('./common')

const { genCommonConf } = common

/**
 * 生成 dev config
 * @param {string} format 'umd' 'esm'
 */
function genDevConf(format) {
  const { input, output = {}, plugins = [], external } = genCommonConf(format)

  return {
    input,
    output,
    external,
    plugins: [
      ...plugins,

      postcss({
        plugins: [autoprefixer()],
        extract: 'css/style.css',
      }),
    ],
  }
}

module.exports = genDevConf
