"use strict";
const utils = require("./utils");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: true,
        usePostCSS: true,
        extract: isProduction
    }),
    cssSourceMap: true,
    cacheBusting: true,
    transformToRequire: {
        video: ["src", "poster"],
        source: "src",
        img: "src",
        image: "xlink:href"
    },
    esModule: true //https://github.com/vuejs/vue-loader/blob/master/docs/en/options.md#esmodule
};
