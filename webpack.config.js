const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: "./src/client/Index.tsx",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/client/index.html",
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
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