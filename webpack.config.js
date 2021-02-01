const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },

        }, {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader", 'import-glob-loader']
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images/'
                }
            }, ],
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/'
                }
            }]
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
    ],
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        inline: true,
        open: true,
        port: 4000,
        historyApiFallback: {
            index: 'index.html',
        },
    },
};