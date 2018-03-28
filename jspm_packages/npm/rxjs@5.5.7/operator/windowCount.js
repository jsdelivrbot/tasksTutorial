/* */ 
"use strict";
var windowCount_1 = require('../operators/windowCount');
function windowCount(windowSize, startWindowEvery) {
  if (startWindowEvery === void 0) {
    startWindowEvery = 0;
  }
  return windowCount_1.windowCount(windowSize, startWindowEvery)(this);
}
exports.windowCount = windowCount;
