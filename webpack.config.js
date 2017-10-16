module.exports = {
  entry: './src/ui/index.js',
  devServer: {
    public: '0.0.0.0'
  },
  output: {
    filename: './assets/bundle.js'
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
