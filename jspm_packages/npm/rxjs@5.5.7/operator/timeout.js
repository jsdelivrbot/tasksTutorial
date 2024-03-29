/* */ 
"use strict";
var async_1 = require('../scheduler/async');
var timeout_1 = require('../operators/timeout');
function timeout(due, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1.async;
  }
  return timeout_1.timeout(due, scheduler)(this);
}
exports.timeout = timeout;
