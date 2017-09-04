const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");
const glob = require("glob");


module.exports = {
  entry: {
    main: [
      "./src/app/main.ts",
    ].concat(glob.sync("./src/**/*.spec.ts")),
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
        loader: 'ts-loader',
      },
      {
        test: /\.(css|scss)$/,
        loader: 'css-loader!sass-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.html', '.tpl', '.js','.ts', '.__test.ts'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
