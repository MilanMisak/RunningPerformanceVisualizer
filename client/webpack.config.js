const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin');
	MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
	const mode = argv.mode || 'development';
	return {
		output: {
			publicPath: mode === 'production' ? './' : '/'
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
			new MiniCssExtractPlugin()
		]
	};
};
