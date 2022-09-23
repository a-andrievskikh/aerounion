const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
	entry: ['@babel/polyfill', paths.src + '/index.js'],

	output: {
		clean: true,
		path: paths.dev,
		filename: '[name].bundle.js',
		assetModuleFilename: '[path]/assets/[name][ext]',
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Aerounion',
			favicon: paths.src + '/assets/icons/favicon.png',
			template: paths.src + '/template.html',
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
			{ test: /\.(?:ico|jpe?g|webp|gif|png|)$/i, type: 'asset/resource' },
			{ test: /\.(woff2?|eot|ttf|otf|svg|)$/i, type: 'asset/inline' },
		],
	},
};
