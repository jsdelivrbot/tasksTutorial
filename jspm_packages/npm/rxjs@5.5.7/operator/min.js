/* */ 
"use strict";
var min_1 = require('../operators/min');
function min(comparer) {
  return min_1.min(comparer)(this);
}
exports.min = min;
