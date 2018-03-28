/* */ 
"use strict";
var pluck_1 = require('../operators/pluck');
function pluck() {
  var properties = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    properties[_i - 0] = arguments[_i];
  }
  return pluck_1.pluck.apply(void 0, properties)(this);
}
exports.pluck = pluck;
