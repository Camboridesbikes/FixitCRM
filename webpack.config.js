const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: "./src/client/Index.tsx",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public"),
        publicPath: '/',
        clean: true,
        assetModuleFilename: 'assets/[hash][ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/client/index.html",
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
         }),
         new MiniCssExtractPlugin({
             filename: '[name].[contenthash].css',
             chunkFilename: '[id].css'
         })
    ],
    devtool: "inline-source-map",
    devServer: {
        static: './public',
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.html', '.scss'],
        modules: ['node_modules'],
        },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[hash][ext]'
                },
                use: 'svgo-loader'
            },
            {
                test: /\.module.(scss|css)$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-modules-typescript-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.(scss|css)$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.m?[jt]sx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", {runtime: "automatic"}],
                            "@babel/preset-typescript",
                        ]
                    }
                }
            }
        ]
    }
}