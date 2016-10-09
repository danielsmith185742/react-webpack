var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: 'eval',
	devServer: { hot : true },
	entry: { login: './src/logsign.jsx',
			about: './src/about.jsx',
			main: './src/index.jsx',
			messageboard: './src/message.jsx',
			blog: './src/blog.jsx',
			blog001: './src/blog001.jsx'},
	output: {
		path: '/home/pi/public/',
		filename: 'js/[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			},
			{
				test: /\.jsx$/,
				loader: 'babel'
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('bootstrap.min.css'),
		new ExtractTextPlugin('garage.css'),
		new HtmlWebpackPlugin({
			inject: true,
			title: "Login",
			filename: "./login.html",
			template: './src/index.html',
			chunks: ['login']
		}),
		new HtmlWebpackPlugin({
			title: "Index",
			filename: "./index.html",
			template: './src/index.html',
			chunks: ['main']
		}),
		new HtmlWebpackPlugin({
			title: "About",
			filename: "./about.html",
			template: './src/index.html',
			chunks: ['about']
		}),
		new HtmlWebpackPlugin({
			inject: true,
			title: "MessageBoard",
			filename: "./messageboard.html",
			template: './src/index.html',
			chunks: ['messageboard']
		}),
		new HtmlWebpackPlugin({
			inject: true,
			title: "Blog",
			filename: "./blog.html",
			template: './src/index.html',
			chunks: ['blog']
		}),
		new HtmlWebpackPlugin({
			inject: true,
			title: "Blog001",
			filename: "./blog001.html",
			template: './src/index.html',
			chunks: ['blog001']
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
