const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");


module.exports = {
  entry: {
    polyfills: [
      "./src/app/polyfills.ts",
    ],
    main: [
      "./src/app/main.ts",
      "./src/css/main.scss",
    ]
  },
  output: {
    path: __dirname + "/public/build",
    publicPath: '/build/',
    filename: '[name].js',
  },
  devtool: "cheap-eval-source-map",
  module: {
    loaders: [
      {
        test: /\.(html|tpl)$/,
        loader: 'raw-loader',
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!sass-loader",
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.html', '.js','.ts', '.__dev.ts', '.tpl'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.NamedModulesPlugin(),
  ],
};
