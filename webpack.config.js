const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/public'),
        historyApiFallback: true,
        compress: true,
        port: 8000,
        open: true,
        proxy: {
            '/api/':{
                target:{
                    host:'127.0.0.1',
                    protocol: 'http',
                    port:3000
                }
            }
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};