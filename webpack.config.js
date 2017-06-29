let path = require('path')
let webpack = require('webpack')
let envFile = require('node-env-file')

/* Fetching NODE_ENV from process object */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
/*Choose NODE_ENV file from config dir to be processed
by plug-in*/
try { envFile( path.join(__dirname, 'config/' 
  + process.env.NODE_ENV + '.env') ) 
} 
catch (e) { }

module.exports =  {
  entry: [
    './app/app.js',
  ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        GITHUB_ACCESS_TOKEN: JSON.stringify(process.env.GITHUB_ACCESS_TOKEN)
      }
    })
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
