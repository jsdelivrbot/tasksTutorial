/* */ 
(function(Buffer) {
  "use strict";
  var bufferToggle_1 = require('../operators/bufferToggle');
  function bufferToggle(openings, closingSelector) {
    return bufferToggle_1.bufferToggle(openings, closingSelector)(this);
  }
  exports.bufferToggle = bufferToggle;
})(require('buffer').Buffer);
