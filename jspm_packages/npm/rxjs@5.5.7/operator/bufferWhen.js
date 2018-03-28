/* */ 
(function(Buffer, process) {
  "use strict";
  var bufferWhen_1 = require('../operators/bufferWhen');
  function bufferWhen(closingSelector) {
    return bufferWhen_1.bufferWhen(closingSelector)(this);
  }
  exports.bufferWhen = bufferWhen;
})(require('buffer').Buffer, require('process'));