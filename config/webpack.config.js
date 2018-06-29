const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js'
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    contentBase: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new HtmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      template: './src/index.html',
      filename: 'index.html',
      hash: true
    }),
    new uglify()
  ],
  module: {
    // config loader
    rules: [
      // stylus loader
      {
        test: /\.styl$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'stylus-loader'}
        ]
      }
    ]
  }
}