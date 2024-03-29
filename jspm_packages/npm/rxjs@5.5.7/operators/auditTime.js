/* */ 
(function(process) {
  "use strict";
  var async_1 = require('../scheduler/async');
  var audit_1 = require('./audit');
  var timer_1 = require('../observable/timer');
  function auditTime(duration, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return audit_1.audit(function() {
      return timer_1.timer(duration, scheduler);
    });
  }
  exports.auditTime = auditTime;
})(require('process'));
