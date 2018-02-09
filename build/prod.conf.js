const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseConf = require("./base.conf");
const utils = require("./utils");

const plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("../.dll/manifest.json")
    }),
    new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                warnings: false
            }
        },
        sourceMap: true,
        parallel: true
    }),
    new ExtractTextPlugin({
        filename: "css/app.[contenthash:8].css",
        allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"), // eslint-disable-line global-require
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
];

const rules = [
    {
        test: /\.css$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader?sourceMap!postcss-loader"
        })
    },
    {
        test: /\.css$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use:
                "css-loader?modules&sourceMap&importLoaders=1&localIdentName=__[hash:base64:5]!postcss-loader"
        })
    },
    {
        test: /\.less$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader?sourceMap!postcss-loader!less-loader"
        })
    },
    {
        test: /\.less$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use:
                "css-loader?modules&sourceMap&importLoaders=1&localIdentName=__[hash:base64:5]!postcss-loader!less-loader"
        })
    }
].concat(
    utils.styleLoaders({
        sourceMap: true,
        extract: true,
        usePostCSS: true
    })
);

const extConf = {
    output: {
        path: path.resolve(__dirname, "../dist/assets"),
        publicPath: "/assets/",
        filename: "js/[name].[chunkhash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].chunk.js"
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            extract: true,
            usePostCSS: true
        })
    },
    plugins
};

module.exports = merge(baseConf, extConf);
