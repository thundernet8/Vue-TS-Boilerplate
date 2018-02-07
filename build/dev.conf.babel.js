import path from "path";
import webpack from "webpack";
import baseConf from "./base.conf.babel";
import utils from "./utils";
import buildConfig from "../config";
import FriendlyErrorsPlugin from "friendly-errors-webpack-plugin";

const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("development")
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
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

const loaders = [
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

const output = {
  path: path.resolve(__dirname, "../dist/assets"),
  publicPath: "/assets/",
  filename: "js/[name].js",
  chunkFilename: "js/[name].chunk.js"
};

let config = baseConf(plugins, loaders);
config.devtool = "#source-map"; // '#eval-source-map'
config.output = output;
config.devServer = {
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
};

export default config;
