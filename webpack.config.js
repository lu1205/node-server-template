const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  target: "node", // 指定构建的目标是 Node.js
  mode: "production", // 指定构建的模式是生产模式
  entry: {
    index: "./app.js", // 指定入口文件
  },
  output: {
    path: path.resolve(__dirname, "./dist"), // 指定输出的目录
    filename: "[name].js", // 指定输出的文件名
    clean: true, // 每次构建之前清空输出目录
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
};
