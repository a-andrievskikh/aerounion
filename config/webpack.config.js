const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, 'src', 'main.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].bundle.js',
		assetModuleFilename: 'assets/[name][ext][query]',
		clean: true,
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
		],
	},
};
