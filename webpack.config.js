const webpackHtmlPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode }) => {
  return webpackMerge(
    {
      mode,
      entry: { app: ["./app.js"] },
      output: { filename: "bundle.js" },
      module: {
        rules: [
          {
            test: /\.(png|gif|jpe?g)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000,
                  name(file) {
                    return "[hash].[ext]";
                  }
                }
              }
            ]
          },
          {
            test: /\.html$/,
            use: [{ loader: "html-loader", options: { attrs: ["img:src"] } }]
          }
        ]
      },
      plugins: [
        new webpackHtmlPlugin({
          template: "./index.html"
        }),
        new webpack.ProgressPlugin(),
        new CopyWebpackPlugin([
          {
            from: "images/webpack-logo.png",
            to: "images/webpack-logo.png"
          }
        ])
      ]
    },
    modeConfig(mode)
  );
};
