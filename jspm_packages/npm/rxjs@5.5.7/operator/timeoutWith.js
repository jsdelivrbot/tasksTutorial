/* */ 
"use strict";
var async_1 = require('../scheduler/async');
var timeoutWith_1 = require('../operators/timeoutWith');
function timeoutWith(due, withObservable, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1.async;
  }
  return timeoutWith_1.timeoutWith(due, withObservable, scheduler)(this);
}
exports.timeoutWith = timeoutWith;
