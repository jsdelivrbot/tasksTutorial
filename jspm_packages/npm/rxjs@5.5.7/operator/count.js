/* */ 
"use strict";
var count_1 = require('../operators/count');
function count(predicate) {
  return count_1.count(predicate)(this);
}
exports.count = count;
