import path from "path";
import webpack from "webpack";
import SimpleProgressWebpackPlugin from "customized-progress-webpack-plugin";
// import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import pkg from "../package.json";

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const vendersConfig = require("../.dll/venders-config.json");
const vueLoaderConfig = require("./vue-loader.conf");

const getPlugins = function(morePlugins) {
  let plugins = [
    new webpack.BannerPlugin(
      `Generated on ${new Date().toString()}\n\nCopyright 2017-present, WuXueqian. All rights reserved.\n\n@package   ${
        pkg.name
      }\n@version   v${pkg.version}\n@author    ${pkg.author}\n`
    ),
    new webpack.HashedModuleIdsPlugin(),
    new SimpleProgressWebpackPlugin({ format: "compact" }),
    // new CopyWebpackPlugin([
    //   { from: "src/favicon.ico", to: path.resolve(__dirname, "../dist") },
    //   { from: "src/robots.txt", to: path.resolve(__dirname, "../dist") }
    // ]),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../.dll/manifest.json")
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "../dist/index.html"),
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

  if (morePlugins) {
    plugins = plugins.concat(morePlugins);
  }

  return plugins;
};

const getRules = function(moreRules) {
  let rules = [
    {
      test: /\.vue$/,
      loader: "vue-loader",
      options: vueLoaderConfig
    },
    {
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/
    },
    {
      test: /\.ts$/,
      loader: "ts-loader",
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
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

  if (moreRules) {
    rules = rules.concat(moreRules);
  }

  return rules;
};

export default function(morePlugins, moreRules) {
  let config = {
    entry: {
      app: "./src/index.ts"
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
      rules: getRules(moreRules)
    },
    plugins: getPlugins(morePlugins)
  };

  return config;
}
