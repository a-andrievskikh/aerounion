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

const optimization = () => {
	if (!devMode) {
		return {
			minimize: true,
			minimizer: [new HtmlMinimizerPlugin(), new CssMinimizerPlugin(), '...'],
			runtimeChunk: {
				name: 'runtime',
			},
		};
	}
};

const performance = () => {
	return {
		hints: devMode ? 'warning' : 'error',
		maxEntrypointSize: (devMode ? 15000 : 3000) * 1024,
		maxAssetSize: (devMode ? 4000 : 3000) * 1024,
	};
};

const stats = () => {
	return {
		preset: devMode ? 'minimal' : 'errors-warnings',
	};
};

const plugins = [
	new PugPlugin({
		// verbose: devMode,
		pretty: devMode,
		extractCss: {
			filename: filename('css'),
		},
	}),
];

console.log(`${process.env.NODE_ENV} mode:`);

module.exports = {
	target,
	devtool,
	plugins,
	context: path.resolve(__dirname, 'src'),
	entry: {
		index: 'index.pug',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: filename('js'),
		chunkFilename: chunkFilename('js'),
		assetModuleFilename: assetModuleFilename(),
		publicPath: '/',
		clean: true,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		watchFiles: {
			paths: ['src/**/*.*', 'assets/scss/**/*.*'],
			options: {
				usePolling: true,
			},
		},
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	module: {
		rules: [
			{
				test: /\.pug$/i,
				exclude: /node_modules/,
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
				generator: {
					filename: 'assets/images/[name].[hash:8][ext]',
				},
			},
			{
				test: /\.(woff|woff?2|eot|ttf|otf|svg)$/i,
				type: 'asset/inline',
				generator: {
					filename: 'assets/fonts/[name][ext][query]',
				},
			},
			{
				test: /\.m?js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.ts$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-typescript'],
					},
				},
			},
			{
				test: /\.jsx$/i,
				exclude: /node_modules/,
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
	// stats: stats(),
};
