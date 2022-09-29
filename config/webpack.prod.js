const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	output: {
		clean: true,
		filename: 'js/[name].[contenthash].bundle.js',
		assetModuleFilename: '[path][hash][query]',
	},

	module: {
		rules: [
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: false,
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles/style.[contenthash].css',
			chunkFilename: '[id].css',
		}),
	],

	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), '...'],
		runtimeChunk: {
			name: 'runtime',
		},
	},

	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
