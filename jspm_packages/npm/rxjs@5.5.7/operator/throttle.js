/* */ 
(function(process) {
  "use strict";
  var throttle_1 = require('../operators/throttle');
  function throttle(durationSelector, config) {
    if (config === void 0) {
      config = throttle_1.defaultThrottleConfig;
    }
    return throttle_1.throttle(durationSelector, config)(this);
  }
  exports.throttle = throttle;
})(require('process'));
