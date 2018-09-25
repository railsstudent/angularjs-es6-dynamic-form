const webpackHtmlPlugin = require("html-webpack-plugin");

module.exports = ({ mode }) => {
  return {
    mode,
    entry: { app: "./app.js" },
    output: {
      filename: "bundle.js"
    },
    devServer: {
      watchContentBase: true
    },
    module: {
      rules: [
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        {
          test: /^(png|gif|jpe?g)$/,
          use: [{ loader: "url-loader", options: { limit: 8192 } }]
        },
        {
          test: /\.html$/,
          use: [{ loader: "html-loader" }]
        }
      ]
    },
    plugins: [
      new webpackHtmlPlugin({
        template: "./index.html"
      })
    ]
  };
};
