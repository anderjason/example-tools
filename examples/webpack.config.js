const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./examples/src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./examples/dist",
    host: "0.0.0.0",
    openPage: "http://localhost:9000",
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./examples/src/index.html",
    }),
  ],
};
