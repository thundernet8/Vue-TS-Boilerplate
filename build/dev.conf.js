const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConf = require("./base.conf");
const utils = require("./utils");
const buildConfig = require("../config");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("development")
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // Log hot updated module path
    new webpack.NamedModulesPlugin(),
    // Add FriendlyErrorsPlugin
    new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
            messages: [
                `Your application is running here: http://${buildConfig.dev.devServer.host}:${
                    buildConfig.dev.devServer.port
                }`
            ]
        },
        onErrors: utils.createNotifierCallback()
    })
];

const rules = [
    {
        test: /\.css$/,
        include: [/global/, /node_modules/],
        loader: "style-loader!css-loader?sourceMap!postcss-loader"
    },
    {
        test: /\.css$/,
        exclude: [/global/, /node_modules/],
        loader:
            "style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]_[name]__[hash:base64:5]!postcss-loader"
    },
    {
        test: /\.less$/,
        include: [/global/, /node_modules/],
        loader: "style-loader!css-loader?sourceMap!postcss-loader!less-loader"
    },
    {
        test: /\.less$/,
        exclude: [/global/, /node_modules/],
        loader:
            "style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]_[name]__[hash:base64:5]!postcss-loader!less-loader"
    }
];

const extConf = {
    devtool: "#source-map",
    output: {
        path: path.resolve(__dirname, "../dist/assets"),
        publicPath: "/assets/",
        filename: "js/[name].js",
        chunkFilename: "js/[name].chunk.js"
    },
    module: {
        rules
    },
    plugins,
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        compress: true,
        host: buildConfig.dev.devServer.host,
        port: buildConfig.dev.devServer.port,
        hot: true,
        open: false,
        quiet: true, // necessary for FriendlyErrorsPlugin
        historyApiFallback: {
            index: "index.html"
        }
        // openPage: "index.html"
        // publicPath: "http://localhost:9001/"
    }
};

module.exports = merge(baseConf, extConf);
