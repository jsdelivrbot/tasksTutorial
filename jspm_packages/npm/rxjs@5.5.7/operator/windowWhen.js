/* */ 
"use strict";
var windowWhen_1 = require('../operators/windowWhen');
function windowWhen(closingSelector) {
  return windowWhen_1.windowWhen(closingSelector)(this);
}
exports.windowWhen = windowWhen;
