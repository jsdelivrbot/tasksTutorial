/* */ 
"use strict";
var observeOn_1 = require('../operators/observeOn');
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return observeOn_1.observeOn(scheduler, delay)(this);
}
exports.observeOn = observeOn;
