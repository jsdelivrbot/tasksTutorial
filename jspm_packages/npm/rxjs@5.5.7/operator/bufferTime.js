/* */ 
(function(Buffer) {
  "use strict";
  var async_1 = require('../scheduler/async');
  var isScheduler_1 = require('../util/isScheduler');
  var bufferTime_1 = require('../operators/bufferTime');
  function bufferTime(bufferTimeSpan) {
    var length = arguments.length;
    var scheduler = async_1.async;
    if (isScheduler_1.isScheduler(arguments[arguments.length - 1])) {
      scheduler = arguments[arguments.length - 1];
      length--;
    }
    var bufferCreationInterval = null;
    if (length >= 2) {
      bufferCreationInterval = arguments[1];
    }
    var maxBufferSize = Number.POSITIVE_INFINITY;
    if (length >= 3) {
      maxBufferSize = arguments[2];
    }
    return bufferTime_1.bufferTime(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler)(this);
  }
  exports.bufferTime = bufferTime;
})(require('buffer').Buffer);
