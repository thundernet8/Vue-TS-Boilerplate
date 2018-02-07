"use strict";
import utils from "./utils";
const isProduction = process.env.NODE_ENV === "production";

export default {
  loaders: utils.cssLoaders({
    sourceMap: true,
    extract: isProduction
  }),
  cssSourceMap: true,
  cacheBusting: true,
  transformToRequire: {
    video: ["src", "poster"],
    source: "src",
    img: "src",
    image: "xlink:href"
  }
};
