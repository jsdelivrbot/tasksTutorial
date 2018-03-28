/* */ 
"use strict";
var async_1 = require('../scheduler/async');
var delay_1 = require('../operators/delay');
function delay(delay, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1.async;
  }
  return delay_1.delay(delay, scheduler)(this);
}
exports.delay = delay;
