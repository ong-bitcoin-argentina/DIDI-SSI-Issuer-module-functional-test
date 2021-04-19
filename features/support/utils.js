import { Selector } from 'testcafe';
import { testController } from './world';
const dotenv = require('dotenv');

export function select(selector) {
  return Selector(selector).with({ boundTestRun: testController });
}

export function selectByDataHook(selector) {
  return Selector(`[data-hook="${selector}"]`).with({
    boundTestRun: testController,
  });
}

export function selectByStartWithDataHook(selector) {
  return Selector(`[data-hook^="${selector}"]`).with({
    boundTestRun: testController,
  });
}
export function makeid(length) {
  var result           = 'test';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

