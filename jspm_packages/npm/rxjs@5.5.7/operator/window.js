/* */ 
"use strict";
var window_1 = require('../operators/window');
function window(windowBoundaries) {
  return window_1.window(windowBoundaries)(this);
}
exports.window = window;
