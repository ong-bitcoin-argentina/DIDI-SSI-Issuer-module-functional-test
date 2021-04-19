import testcafe from 'testcafe';
import { testController } from './world';

import * as hooks from './hooks';

export const addErrorToController = () =>
  testController.executionChain.catch((result) => {
    const errAdapter = new testcafe.embeddingUtils.TestRunErrorFormattableAdapter(result, {
      testRunPhase: testController.testRun.phase,
      userAgent: testController.testRun.browserConnection.browserInfo.userAgent,
    });
    return testController.testRun.errs.push(errAdapter);
  });

export const ifErrorTakeScreenshot = (resolvedTestController) => {
  if (
    hooks.getIsTestCafeError() === true &&
    testController.testRun.opts.takeScreenshotsOnFails === true
  ) {
    if (
      process.argv.includes('--format') ||
      process.argv.includes('-f') ||
      process.argv.includes('--format-options')
    ) {
      return resolvedTestController
        .takeScreenshot()
        .then(() => hooks.getAttachScreenshotToReport());
    }
    return resolvedTestController.takeScreenshot();
  }
  return false;
};
