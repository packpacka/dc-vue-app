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
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!sass-loader",
        }),
      },
    ]
  },
  resolve: {
    extensions: ['.html', '.tpl', '.js','.ts', '.__prod.ts'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 6,
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 4001,
    }),
  ],
};
