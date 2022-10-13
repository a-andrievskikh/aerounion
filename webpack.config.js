const path = require('path');
const PugPlugin = require('pug-plugin');

const devMode = process.env.NODE_ENV === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'inline-source-map' : false;

console.log(`${process.env.NODE_ENV} mode:`);

const optimization = () => {
	if (!devMode) {
		const config = {
			minimize: true,
			runtimeChunk: {
				name: 'runtime',
			},
		};
		return config;
	}
};

const performance = () => {
	if (!devMode) {
		const config = {
			hints: 'error',
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		};
		return config;
	}
};

module.exports = {
	target,
	devtool,
	context: path.resolve(__dirname, 'src'),
	entry: {
		index: 'template.pug',
	},
	output: {
		clean: true,
		path: path.resolve(__dirname, 'dist'),
		filename: devMode ? '[name].js' : '[name].[contenthash:8].bundle.js',
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
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
			{
				test: /\.(?:ico|jpe?g|webp|gif|png)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/img/[name].[hash:8][ext]',
				},
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
	optimization: optimization(),
	performance: performance(),
};
