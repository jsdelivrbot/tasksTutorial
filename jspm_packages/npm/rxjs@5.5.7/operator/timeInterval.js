/* */ 
"use strict";
var async_1 = require('../scheduler/async');
var timeInterval_1 = require('../operators/timeInterval');
exports.TimeInterval = timeInterval_1.TimeInterval;
function timeInterval(scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1.async;
  }
  return timeInterval_1.timeInterval(scheduler)(this);
}
exports.timeInterval = timeInterval;
