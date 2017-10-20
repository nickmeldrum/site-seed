const path = require('path')
const srcRootPath = path.resolve(__dirname, './src/ui/')

module.exports = {
  context: srcRootPath,
  entry: './index.js',
  devServer: {
    public: '0.0.0.0'
  },
  output: {
    filename: './assets/bundle.js'
  },
  resolve: {
    modules: [ 'src/ui', 'node_modules' ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      }
    ]
  },
}
