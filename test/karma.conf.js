// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html

'use strict';

module.exports = function(config) {

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: './..',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'chai-as-promised'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js',
      'node_modules/jquery/dist/jquery.js',
      'dist/react-pagenav.js',
      'test/test.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],

    // web server port
    port: 8078,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    browsers: ['PhantomJS'],

    // Timeouts for SauceLabs
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 2, // default 0
    browserNoActivityTimeout: 30 * 1000, //default 10000

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    preprocessors: {
      'test/test.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map'
    },

    plugins: [
      'karma-mocha',
      'karma-chai-plugins',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],

    // Coverage reporter generates the coverage
    coverageReporter: {
      reporters:[
        {type: 'lcov', dir:'test/coverage/'},
        {type: 'text-summary', dir:'test/coverage/'}
      ]
    }

  })

};
