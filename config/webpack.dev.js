const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	output: {
		clean: true,
		filename: '[name].js',
		assetModuleFilename: '[path][name][ext][query]',
	},
	module: {
		rules: [
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},
});
