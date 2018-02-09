const path = require("path");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";
const getPlugins = function() {
    let plugins = [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.resolve(__dirname, "../.dll/manifest.json"),
            name: "[name]_[chunkhash:8]"
        }),
        new AssetsPlugin({
            filename: "venders-config.json",
            path: "./.dll"
        }),
        new webpack.HashedModuleIdsPlugin()
    ];

    if (!isDev) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: true
            })
        );
    }
    return plugins;
};

const config = {
    entry: {
        venders: ["vue", "vue-router", "babel-polyfill"]
    },
    output: {
        path: path.resolve(__dirname, "../dist/assets/js"),
        publicPath: "/assets/js/",
        filename: "[name].[chunkhash:8].js",
        library: "[name]_[chunkhash:8]"
    },
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "../src")]
    },
    plugins: getPlugins()
};

if (isDev) {
    config.devtool = "#source-map"; // '#eval-source-map'
}

module.exports = config;
