/* */ 
(function(process) {
  "use strict";
  var async_1 = require('../scheduler/async');
  var throttle_1 = require('../operators/throttle');
  var throttleTime_1 = require('../operators/throttleTime');
  function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    if (config === void 0) {
      config = throttle_1.defaultThrottleConfig;
    }
    return throttleTime_1.throttleTime(duration, scheduler, config)(this);
  }
  exports.throttleTime = throttleTime;
})(require('process'));
