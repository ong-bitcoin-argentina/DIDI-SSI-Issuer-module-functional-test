import fs from 'fs';
import createTestCafe from 'testcafe';
import { AfterAll, setDefaultTimeout, Before, After, Status } from 'cucumber';
import { testController } from './world';
import testControllerHolder from './testControllerHolder';
import * as errorHandling from './errorHandling';

const TIMEOUT = 2000000;

let isTestCafeError = false;
let attachScreenshotToReport = null;
let cafeRunner = null;
let n = 0;

function createTestFile() {
  fs.writeFileSync(
    'test.js',
    'import * as errorHandling from "./features/support/errorHandling.js";\n' +
      'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +
      'fixture("fixture")\n' +
      'test\n' +
      '("test", testControllerHolder.capture)\n' +
      '.after(async t => {await errorHandling.ifErrorTakeScreenshot(t)})'
  );
}

function runTest(iteration, browser) {
  createTestCafe('localhost', 1338 + iteration, 1339 + iteration)
    .then(function create(tc) {
      cafeRunner = tc;
      const runner = tc.createRunner();
      return (
        runner
          // .startApp('yarn start', 50000)
          .src('./test.js')
          .screenshots('reports/screenshots/', true)
          .browsers(browser)
          .run({
            skipJsErrors: true,
            selectorTimeout: 15000,
            assertionTimeout: 15000,
          })
          .catch(function err(error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
          })
      );
    })
    .then((failedCount) => {
      /* eslint-disable no-console */
      console.log(`Tests failed: ${failedCount}`);
      /* eslint-enable no-console */
    });
}

function createAndRunTest() {
  createTestFile();
  runTest(n, this.getBrowser());
  n += 2;

  return this.waitForTestController.then(function testCtrl() {
    return testController.maximizeWindow();
  });
}

function unlinkTest() {
  fs.unlinkSync('test.js');
  testControllerHolder.free();
}

function handleErrors(testCase) {
  const world = this;
  if (testCase.result.status === Status.FAILED) {
    isTestCafeError = true;
    ({ attachScreenshotToReport } = world);
    errorHandling.addErrorToController();
  }
}

function afterAll() {
  let intervalId = null;

  function checkLastResponse() {
    if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
      cafeRunner.close();
      process.exit();
      clearInterval(intervalId);
    }
  }

  function waitForTestCafe() {
    intervalId = setInterval(checkLastResponse, 500);
  }

  waitForTestCafe();
}

setDefaultTimeout(TIMEOUT);

Before(createAndRunTest);

After(unlinkTest);

After(handleErrors);

AfterAll(afterAll);

export const getIsTestCafeError = () => {
  return isTestCafeError;
};
export const getAttachScreenshotToReport = () => {
  return attachScreenshotToReport;
};
