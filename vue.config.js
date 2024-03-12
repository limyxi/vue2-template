const webpack = require("webpack");
// const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const constanst = require("./src/libs/constanst");
const productionGzipExtensions = ["html", "js", "css"];
module.exports = {
  // 开发环境下的代理地址
  devServer: {
    proxy: {
      [constanst.baseUrl]: {
        target: "",
        changeOrigin: true,
        pathRewrite: {
          [`^${constanst.baseUrl}`]: "",
        },
      },
    },
  },
  // 静态资源打包地址
  outputDir: "dist",
  // 打包配置
  pages: {
    // pc端
    index: "src/main.js",
  },

  // 部署应用包时的基本 URL
  publicPath: constanst.publicPath,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false, // 删除原文件
      }),
    ],
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
  },
};
