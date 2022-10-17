const path = require('path');
const PugPlugin = require('pug-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'inline-source-map' : false;

const filename = ext => (devMode ? `[name].${ext}` : `[name].[contenthash:8].${ext}`);
const chunkFilename = ext => (devMode ? `[id].${ext}` : `[id].[contenthash:8].${ext}`);
const assetModuleFilename = () => (devMode ? '[path][name][ext]' : 'assets/[hash:8][ext][query]');
console.log(`${process.env.NODE_ENV} mode:`);

const optimization = () => {
	if (!devMode) {
		const config = {
			minimize: true,
			minimizer: [new HtmlMinimizerPlugin(), new CssMinimizerPlugin(), '...'],
			runtimeChunk: {
				name: 'runtime',
			},
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
		path: path.resolve(__dirname, 'dist'),
		filename: filename('js'),
		chunkFilename: chunkFilename('js'),
		assetModuleFilename: assetModuleFilename(),
		publicPath: 'auto',
		clean: true,
	},
	devServer: {
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	plugins: [
		new PugPlugin({
			// verbose: devMode,
			pretty: devMode,
			extractCss: {
				filename: filename('css'),
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
					{
						loader: 'css-loader',
						options: {
							import: false,
						},
					},
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
			},
			{
				test: /\.(woff|woff?2|eot|ttf|otf|svg)$/i,
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
	performance: {
		hints: devMode ? 'warning' : 'error',
		maxEntrypointSize: (devMode ? 15000 : 3000) * 1024,
		maxAssetSize: (devMode ? 4000 : 3000) * 1024,
	},
	stats: {
		// colors: true,
		preset: devMode ? 'minimal' : 'errors-warnings',
		// loggingDebug: devMode ? ['sass-loader'] : [],
	},
};
