const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	TerserJSPlugin = require('terser-webpack-plugin'),
	OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
	const mode = argv.mode || 'development';
	return {
		output: {
			publicPath: mode === 'production' ? './' : '/',
			filename: '[name].[chunkhash].js',
			chunkFilename: '[name].[chunkhash].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					}
				},
				{
					test: /\.scss$/,
					use: [
						mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader'
					]
				}
			]
		},
		resolve: {
			alias: {
				config: path.join(__dirname, 'config', mode)
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html'
			}),
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].css'
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorPluginOptions: {
					preset: ['default', {discardComments: {removeAll: true}}],
				}
			})
		],
		optimization: mode === 'production'
			? {
				minimizer: [
					new TerserJSPlugin()
				]
			}
			: {}
	};
};
