/* */ 
(function(Buffer) {
  "use strict";
  var buffer_1 = require('../operators/buffer');
  function buffer(closingNotifier) {
    return buffer_1.buffer(closingNotifier)(this);
  }
  exports.buffer = buffer;
})(require('buffer').Buffer);