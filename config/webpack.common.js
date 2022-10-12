const path = require('path');
const PugPlugin = require('pug-plugin');

const devMode = process.env.NODE_ENV === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'inline-source-map' : false;

module.exports = {
	target,
	devtool,
	entry: {
		index: './src/template.pug',
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
	},
	plugins: [
		new PugPlugin({
			pretty: devMode,
			extractCss: {
				filename: devMode ? '[name].css' : '[name].[contenthash:8].css',
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.pug$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: PugPlugin.loader,
				},
			},
			{
				test: /\.(?:ico|jpe?g|webp|gif|png)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff2?|svg)$/i,
				type: 'asset/inline',
			},
			{
				test: /\.m?js$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.ts$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-typescript'],
					},
				},
			},
			{
				test: /\.jsx$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
		],
	},
};
