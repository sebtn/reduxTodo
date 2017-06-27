let path = require('path')
let webpack = require('webpack')

/*fetch node env*/
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports =  {
  entry: [
    './app/app.js',
  ],
  output: {
    path: path.resolve( __dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        exclude:/node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["babel-preset-es2015", "react", "babel-preset-stage-0" ]
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined :'cheap-module-eval-source-map'  
}
