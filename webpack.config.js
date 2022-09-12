const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, 'src', 'main.js'),
	},
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: 'index.html',
		}),
	],
};