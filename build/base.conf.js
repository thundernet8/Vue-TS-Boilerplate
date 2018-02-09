const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("../package.json");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const vendersConfig = require("../.dll/venders-config.json");
const vueLoaderConfig = require("./vue-loader.conf");

let plugins = [
    new webpack.BannerPlugin(
        `Generated on ${new Date().toString()}\n\nCopyright ${new Date().getFullYear()}. All rights reserved.\n\n@package   ${
            pkg.name
        }\n@version   v${pkg.version}\n@author    ${pkg.author}\n`
    ),
    new CopyWebpackPlugin([{ from: "src/favicon.ico", to: path.resolve(__dirname, "../dist") }]),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("../.dll/manifest.json")
    }),
    new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, "../dist/index.html"),
        template: "src/index.html",
        inject: true,
        vendersName: vendersConfig.venders.js,
        meta: "",
        htmlDom: "",
        state: ""
    }),
    new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, "../dist/index.ejs"),
        template: "src/index.html",
        inject: true,
        vendersName: vendersConfig.venders.js,
        meta: "<%- meta %>",
        htmlDom: "<%- markup %>",
        state: "<script>window.__INITIAL_STATE__ = <%- initialState %></script>"
    })
];

if (!!process.env.ANALYZE_ENV) {
    plugins.push(new BundleAnalyzerPlugin());
}

const rules = [
    {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
    },
    {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
    },
    {
        test: /\.tsx?$/,
        use: [
            {
                loader: "babel-loader"
            },
            {
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        ],
        exclude: /node_modules/
    },
    {
        test: /\.json$/,
        loader: "json-loader",
        exclude: /node_modules/
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            name: "img/[name].[hash:7].[ext]"
        }
    },
    {
        test: /\.(woff|woff2|eot|ttf)/, // if /\.(woff|woff2|eot|ttf|svg)$/ the font-awesome with url like xx.woff?v=4.7.0 can not be loaded
        exclude: /node_modules/,
        loader: "url-loader",
        query: {
            limit: 10000,
            name: "fonts/[name].[ext]"
        }
    }
];

module.exports = {
    entry: {
        app: "./src/index.tsx"
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    },
    resolve: {
        extensions: [".json", ".js", ".jsx", ".ts", ".tsx", ".css", ".less", ".scss", ".vue"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": path.join(__dirname, "../src")
        },
        modules: ["node_modules", path.resolve(__dirname, "../src")]
    },
    target: "web",
    module: {
        rules
    },
    plugins
};
