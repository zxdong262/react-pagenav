const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const configSys = require('./build/config')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const pack = require('./package.json')
const today = new Date().toISOString().substr(0, 10) 

let config = {
  entry: {
    'react-pagenav': ['./src/react-pagenav.jsx'],
    app: './src/index.jsx'
  },
  output: {
    path: __dirname + '/dist/', //输出文件目录
    filename: '[name].bundle.js', //输出文件名
    libraryTarget: 'var',
    publicPath: '/'
  },
  watch: true,
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:' + configSys.port })
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    watch: true,
    port: configSys.port,
    proxy: {
      '*': {
        target: 'http://localhost:' + configSys.devServerPort,
        secure: false,
        ws: false,
        bypass: function (req, res, opt) {
          if (
            /(\.json|\.jpg|\.png|\.css)$/.test(req.path) ||
            /\.bundle\.js/.test(req.path)
          ) {
            console.log('bypass', req.path)
            return req.path
          }
        }
      }
    }
  },
}

if (process.env.NODE_ENV === 'production') {

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
      }
    }),
    new UnminifiedWebpackPlugin(),
    new webpack.BannerPlugin(
      `
/**
 * ${pack.name}
 * @version v${pack.version} - ${today}
 * @link ${pack.homepage}
 * @author ${pack.author.name} (${pack.author.email})
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
      `
      , { raw: true })
  ]

  config.entry = {
    'react-pagenav': ['./src/react-pagenav.jsx'],
    app: './src/index.jsx'
  },

  config.output = {
    path: __dirname + '/dist/', //输出文件目录
    filename: '[name].min.js', //输出文件名
    libraryTarget: 'umd',
    publicPath: '/',
    library: 'ReactPagenav'
  }

  config.externals = {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  }

  config.devtool = 'source-map'

}


module.exports = config