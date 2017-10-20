const path = require('path')

const ssrDirectory = __dirname
const uiDirectory = path.resolve(__dirname, '../ui')

require('babel-register')({
  presets: ['es2015'],
  resolveModuleSource: require('babel-resolver')(ssrDirectory, uiDirectory)
})
require('./server')
