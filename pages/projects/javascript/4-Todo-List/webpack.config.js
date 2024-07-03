const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { type } = require('os');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bunde.js',
        clean: true,
        assetModuleFilename: 'assets/[name][ext]',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo List',
            filename: 'index.html',
            template: 'src/template.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
}