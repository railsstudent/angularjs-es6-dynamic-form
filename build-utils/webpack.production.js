const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = () => ({
  devtool: "source-map",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new ImageminPlugin({
      test: /\.png$/,
      optipng: {
        optimizationLevel: 9
      }
    })
  ]
});
