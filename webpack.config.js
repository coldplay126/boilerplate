require("dotenv").config();

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

module.exports = {
  entry: "./src/index.js",
  mode: isProd ? "production" : "development",
  devtool: isProd ? "hidden-source-map" : "source-map",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "/dist"),
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", "scss"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // checks for .js or .jsx files
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              {
                corejs: 3,
                proposals: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/, // checks for .css files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(webp|jpg|png|jpeg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      hash: true,
    }),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
  ],

  stats: "errors-only",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    port: PORT,
    open: true,
    client: {
      overlay: true,
    },
    hot: true,
    host: "localhost",
    historyApiFallback: true,
    compress: true,
  },
};
