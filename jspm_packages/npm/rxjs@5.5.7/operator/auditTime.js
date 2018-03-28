/* */ 
(function(process) {
  "use strict";
  var async_1 = require('../scheduler/async');
  var auditTime_1 = require('../operators/auditTime');
  function auditTime(duration, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return auditTime_1.auditTime(duration, scheduler)(this);
  }
  exports.auditTime = auditTime;
})(require('process'));