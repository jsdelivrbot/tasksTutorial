/* */ 
(function(Buffer) {
  "use strict";
  var bufferCount_1 = require('../operators/bufferCount');
  function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) {
      startBufferEvery = null;
    }
    return bufferCount_1.bufferCount(bufferSize, startBufferEvery)(this);
  }
  exports.bufferCount = bufferCount;
})(require('buffer').Buffer);
