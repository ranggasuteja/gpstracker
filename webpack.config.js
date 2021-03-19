const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const path = require("path");

module.exports = {
  module: {
    rules: [
      //// CSS loader basic
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      //   // Post CSS + Sass basic
      //   {
      //     test: /\.scss$/,
      //     use: [
      //       "style-loader",
      //       {
      //         loader: "css-loader",
      //         options: {
      //           importLoaders: 1,
      //         },
      //       },
      //       "postcss-loader",
      //       "sass-loader",
      //     ],
      //   },

      // Separate CSS and JS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },

      //// Enable module
      //   {
      //     test: /\.scss$/,
      //     use: [
      //       MiniCssExtractPlugin.loader, // instead of style-loader
      //       {
      //         loader: "css-loader",
      //         options: {
      //           importLoaders: 1,
      //           modules: true,
      //         },
      //       },
      //       "postcss-loader",
      //       "sass-loader",
      //     ],
      //     include: /\.module\.css$/,
      //   },
      //   {
      //     test: /\.scss$/,
      //     use: [
      //       MiniCssExtractPlugin.loader, // instead of style-loader
      //       "css-loader",
      //       "postcss-loader",
      //       "sass-loader",
      //     ],
      //     exclude: /\.module\.css$/,
      //   },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: "all" },
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
};
