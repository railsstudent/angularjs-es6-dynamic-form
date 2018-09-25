const webpackHtmlPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
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
                  limit: 8192
                }
              }
            ]
          },
          { test: /\.html$/, use: [{ loader: "html-loader" }] }
        ]
      },
      plugins: [
        new webpackHtmlPlugin({
          template: "./index.html"
        }),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode)
  );
};
