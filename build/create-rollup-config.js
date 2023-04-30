/**
 * @description 创建 rollup 配置
 * @author wangfupeng
 */

const _ = require('lodash')
const rollupPluginVisualizer = require('rollup-plugin-visualizer')
const genDevConf = require('./config/dev')
const genPrdConf = require('./config/prd')

const { merge } = _
const { visualizer } = rollupPluginVisualizer

// 环境变量
const ENV = process.env.NODE_ENV || 'production'
const IS_SIZE_STATS = ENV.indexOf('size_stats') >= 0 // 分析包体积
const IS_DEV = ENV.indexOf('development') >= 0
const IS_PRD = ENV.indexOf('production') >= 0

/**
 * 生成单个 rollup 配置
 * @param {object} customConfig { input, output, plugins ... }
 */
function createRollupConfig(customConfig = {}) {
  const { input, output = {}, plugins = [] } = customConfig
  const { format } = output

  let baseConfig
  if (IS_PRD) {
    baseConfig = genPrdConf(format)
  } else {
    baseConfig = genDevConf(format)
  }

  if (IS_SIZE_STATS) {
    // 分析包体积。运行之后可查看 package 下的 `stats.html`
    plugins.push(visualizer())
  }

  const config = {
    input: input ? input : baseConfig.input,
    output,
    plugins,
  }

  const res = merge({}, baseConfig, config)
  return res
}

module.exports = createRollupConfig
