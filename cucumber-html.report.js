/* eslint-disable import/no-extraneous-dependencies  */
const reporter = require('cucumber-html-reporter');
const packageJSON = require('./package.json');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/report.json',
  output: 'reports/report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    'App Version': packageJSON.version,
    'Test Environment': 'Development',
    Browser: 'chrome',
    Platform: process.platform,
    Parallel: 'Scenarios',
  },
};

reporter.generate(options);

// more info on `metadata` is available in `options` section below.

// to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.
