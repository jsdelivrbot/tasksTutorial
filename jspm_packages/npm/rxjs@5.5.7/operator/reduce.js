/* */ 
"use strict";
var reduce_1 = require('../operators/reduce');
function reduce(accumulator, seed) {
  if (arguments.length >= 2) {
    return reduce_1.reduce(accumulator, seed)(this);
  }
  return reduce_1.reduce(accumulator)(this);
}
exports.reduce = reduce;
