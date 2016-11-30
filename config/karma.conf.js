var webpackConfig = require('./webpack');
/**
 * Devtool
 * Reference: http://webpack.github.io/docs/configuration.html#devtool
 * Type of sourcemap to use per build type
 */
webpackConfig.devtool = 'inline-source-map';
/**
 * Entry
 * Reference: http://webpack.github.io/docs/configuration.html#entry
 * Should be an empty object if it's generating a test build
 * Karma will set this when it's a test build
 */
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
               basePath: '../',
               frameworks: ['mocha', 'chai'],
               files: [
                 './src/tests.webpack.js'
               ],
               exclude: [
               ],
               preprocessors: {
                 './src/tests.webpack.js': ['webpack', 'sourcemap', 'coverage']
               },
               webpack: webpackConfig,
               webpackMiddleware: {
                 noInfo: true
               },
               reporters: ['mocha', 'coverage'],
               mochaReporter: {
                 showDiff: true
               },
               coverageReporter: {
                 dir: 'coverage/',
                 reporters: [
                   {type: 'text-summary'},
                   {type: 'html'}
                 ]
               },
               port: 9876,
               colors: true,
               logLevel: config.LOG_INFO,
               browsers: ['PhantomJS'],
               singleRun: true
             })
}
