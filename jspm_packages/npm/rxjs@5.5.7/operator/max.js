/* */ 
"use strict";
var max_1 = require('../operators/max');
function max(comparer) {
  return max_1.max(comparer)(this);
}
exports.max = max;