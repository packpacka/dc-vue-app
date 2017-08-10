const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");
const glob = require("glob");


module.exports = {
  entry: {
    main: [
      "./src/app/main.ts",
      "./test/bootstrap-tests.ts",
    ].concat(glob.sync("./src/**/*.spec.ts")),
  },
  output: {
    path: __dirname + "/test/build",
    filename: '[name].js',
  },
  devtool: "cheap-eval-source-map",
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.html', '.js','.ts', '.__test.ts'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
