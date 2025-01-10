const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "node_modules/svg-captcha/fonts", to: "fonts" }, // 复制 fonts 目录
      ],
    }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      cacheGroups: {
        defaultVendors: {
          filename: "js/bundle.js",
        },
      },
    },
  },
};
