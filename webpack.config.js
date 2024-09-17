const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const config = {
  entry: "./src/script.js",
  mode: "production",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "development",
      template: "./src/index.html",
      minify: {
        removeComments: true, // Remove comments from the HTML
        collapseWhitespace: true, // Remove extra whitespace
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        keepClosingSlash: true,
        // ignoreCustomFragments: [/<!--.*?-->/], // Optionally ignore custom fragments
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
};

module.exports = config;
