var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: [
		'./src/index.jsx'
	],
	output: {
		filename: 'bundle.js',
		publicPath: '/lib/',
		path: path.resolve(__dirname, 'lib')
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	devtool: '#eval-source-map',
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				loaders: ['babel'],
				include: path.join(__dirname, '/src')
			}
			,{
				test: /\.(html|css)$/,
				loader: 'raw-loader'
			}
		]
	}
}
