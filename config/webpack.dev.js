const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
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
