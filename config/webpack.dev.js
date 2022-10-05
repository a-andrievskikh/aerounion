const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	output: {
		clean: true,
		filename: '[name].bundle.js',
		assetModuleFilename: '[path][name][ext][query]',
	},

	devServer: {
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles/[name].css',
		}),
	],

	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
});
