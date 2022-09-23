const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
	entry: [paths.src + '/index.js'],

	output: {
		path: paths.build,
		filename: '[name].bundle.js',
		assetModuleFilename: 'assets/[name][ext]',
		clean: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Aerounion',
			favicon: paths.src + '/images/favicon.png',
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
