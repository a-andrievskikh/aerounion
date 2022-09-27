const path = require('path');
const src = path.resolve(__dirname, '../src');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: ['@babel/polyfill', src + '/index.js'],

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Aerounion',
			favicon: src + '/assets/icons/favicon.png',
			template: src + '/template.html',
			filename: 'index.html',
		}),
	],

	module: {
		rules: [
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
			{ test: /\.(?:ico|jpe?g|webp|gif|png)$/i, type: 'asset/resource' },
			{ test: /\.(woff2?|eot|ttf|otf|svg|)$/i, type: 'asset/inline' },
		],
	},
};
