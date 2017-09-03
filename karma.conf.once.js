const webpackConfig = require('./webpack.config.test.js');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['dots'],

    files: [
      { pattern: 'src/**/*.test.ts', watched: false }
    ],

    preprocessors: {
      'src/**/*.test.ts': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
