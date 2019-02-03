const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './server.js',
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  mode: 'none',
  externals: [/node_modules/],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
   plugins: [
     new UglifyJSPlugin({
         uglifyOptions: {
            output: {
                comments: false
            }
         }
     }),
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     })
    ]
};