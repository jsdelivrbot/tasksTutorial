/* */ 
"use strict";
var async_1 = require('../scheduler/async');
var timestamp_1 = require('../operators/timestamp');
function timestamp(scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1.async;
  }
  return timestamp_1.timestamp(scheduler)(this);
}
exports.timestamp = timestamp;
