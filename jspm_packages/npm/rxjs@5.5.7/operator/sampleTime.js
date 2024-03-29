/* */ 
"use strict";
var async_1 = require('../scheduler/async');
var sampleTime_1 = require('../operators/sampleTime');
function sampleTime(period, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1.async;
  }
  return sampleTime_1.sampleTime(period, scheduler)(this);
}
exports.sampleTime = sampleTime;
