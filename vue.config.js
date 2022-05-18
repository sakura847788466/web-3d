/*
 * @Descripttion: commonVueTemplate
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-10-27 14:51:26
 * @LastEditors: ada 847788466@qq.com
 * @LastEditTime: 2022-05-07 14:15:49
 */
"use strict";
const path = require("path");
const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const defaultSettings = require("./src/settings.js");
const name = defaultSettings.title; // page title

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = process.env.port || process.env.npm_config_port || 9527; // dev port
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
const cesiumThirdParty = "../Build/Cesium/ThirdParty";

module.exports = {
  publicPath: "",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    port: port,
    open: false,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // 代理，原来通配'**'改为''
    proxy: {
      "": {
        target: "https://ygamgr.gdhqx.cn",
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        predentdata: `@import "@/style/variables.scss";`,
      },
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 16, //根节点字体
            unitPrecision: 8,
            propWhiteList: [],
            propBlackList: [],
            selectorBlackList: [],
            ignoreIdentifier: false,
            replace: true,
            mediaQuery: false,
            minPixelValue: 2,
          }),
        ],
      },
    },
  },
  parallel: false,
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        cesium: resolve(cesiumSource),
      },
    },
    amd: {
      toUrlUndefined: true,
    },

    plugins: [
      new CopyWebpackPlugin([
        // { from: path.join(cesiumSource, cesiumjs), to: 'Cesium/Cesium.js' },
        {
          from: path.join(cesiumSource, cesiumThirdParty),
          to: "Cesium/ThirdParty",
        },
        { from: path.join(cesiumSource, "Assets"), to: "Cesium/Assets" },
        { from: path.join(cesiumSource, "Widgets"), to: "Cesium/Widgets" },
        { from: path.join(cesiumSource, cesiumWorkers), to: "Cesium/Workers" },
        { from: "src/assets", to: "assets" },
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("Cesium"),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "@open-wc/webpack-import-meta-loader",
          },
        },
      ],
    },
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    // set svg-sprite-loader
    // config.module
    //     .rule('svg')
    //     .exclude.add(resolve('src/icons'))
    //     .end()
    // config.module
    //     .rule('icons')
    //     .test(/\.svg$/)
    //     .include.add(resolve('src/icons'))
    //     .end()
    //     .use('svg-sprite-loader')
    //     .loader('svg-sprite-loader')
    //     .options({
    //         symbolId: 'icon-[name]'
    //     })
    //     .end()

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true; //表示编译的渲染函数将会保留HTML标记之间的所有空白字符
        return options;
      })
      .end();

    config.module.set("unknownContextRegExp", /^('|')\.\/.*?\1$/);
    config.module.set("unknownContextCritical", false);

    config
      // 打包环境分包
      .when(process.env.NODE_ENV !== "development", (config) => {
        config
          .plugin("ScriptExtHtmlWebpackPlugin")
          .after("html")
          .use("script-ext-html-webpack-plugin", [
            {
              inline: /runtime\..*\.js$/,
            },
          ])
          .end();
        config.optimization.splitChunks({
          chunks: "all",
          cacheGroups: {
            libs: {
              name: "chunk-libs",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial", // only package third parties that are initially dependent
            },
            elemntUI: {
              name: "chunk-elemntUI", // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
            },
            commons: {
              name: "chunk-commons",
              test: resolve("src/components"), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        });
        config.optimization.runtimeChunk("single");
      });
  },
};
