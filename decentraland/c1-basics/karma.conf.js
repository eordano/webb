module.exports = function(config) {
  config.set({
    plugins: ["karma-spec-reporter", "karma-mocha-reporter"],
    reporters: ['spec', 'mocha'],
    logLevel: config.LOG_DEBUG,
    colors: true,
    jsonResultReporter: {
      outputFile: `${process.env['TEST_UNDECLARED_OUTPUTS_DIR']}/karma-result.json`,
      isSynchronous: true
    },
    specReporter: {
      showSpecTiming: true, // print the time elapsed for each spec
      failFast: true // test would finish with error when a first fail occurs.
    }
  })
}
