const createRollupConfig = require('../../../build/create-rollup-config')
const pkg = require('./package.json')

const name = 'copyText'

const configList = []

// esm
const esmConf = createRollupConfig({
  output: {
    file: pkg.module,
    format: 'esm',
    name,
  },
})
configList.push(esmConf)

// umd
const umdConf = createRollupConfig({
  output: {
    file: pkg.main,
    format: 'umd',
    name,
  },
})
configList.push(umdConf)

module.exports = configList
