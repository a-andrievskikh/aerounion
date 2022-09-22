const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',

	devServer: {
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},

	module: {
		rules: [
			{ test: /\.html$/i, loader: 'html-loader' },
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true, importLoaders: 1, modules: false },
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [require('postcss-present-env')],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true },
					},
				],
			},
		],
	},
});
