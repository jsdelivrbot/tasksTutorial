/* */ 
"use strict";
var windowToggle_1 = require('../operators/windowToggle');
function windowToggle(openings, closingSelector) {
  return windowToggle_1.windowToggle(openings, closingSelector)(this);
}
exports.windowToggle = windowToggle;