var path = require('path');
var webpack = require('webpack');

var HtmlPlugin = require('html-webpack-plugin');   // 自动生成 html 文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');  // css 单独打包

//var autoprefixer = require('autoprefixer');   // 给 css 自动添加前缀

var DES_PATH = '../des';

var config = {
	devtool: 'eval-source-map',

	entry: './index.jsx',
	output: {
		path: DES_PATH,
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'jsx',
				exclude: '/node_modules'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: '/node_modules'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
				// 这有问题  scss 怎么不能单独打包!!!!!
				//loader: ExtractTextPlugin.extract('style-loader','css-loader','sass-loader')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader','css-loader','autoprefixer-loader')
			},
			{
				test: /\.(jpg|png)$/,
				loader: 'url?limit=8192'
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
			// {    为什么这样会报错呢
			// 	test: /\.jsx?$/,
			// 	loader: 'babel',
			// 	exclude: '/node_modules'
			// },
		]
	},
	//postcss: [autoprefixer({browsers: ['last 2 versions']})],

	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new HtmlPlugin({
			template: './view/index.html',
			filename: 'index.html'
		}),
		new ExtractTextPlugin('gallery.css')
	],

	resolve: {
		extensions: ['','.js','.jsx','.json','.scss','.css']
	},


	/*   为什么就启动不起来呢!!!!!
	devServer: {
		hot: true,
		inline: true,
		progress: true,
		historyApiFallback: true
	}
	*/

};



module.exports = config