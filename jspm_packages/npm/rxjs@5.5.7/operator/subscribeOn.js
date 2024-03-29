/* */ 
"use strict";
var subscribeOn_1 = require('../operators/subscribeOn');
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return subscribeOn_1.subscribeOn(scheduler, delay)(this);
}
exports.subscribeOn = subscribeOn;
