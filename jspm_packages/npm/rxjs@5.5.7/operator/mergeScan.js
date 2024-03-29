/* */ 
"use strict";
var mergeScan_1 = require('../operators/mergeScan');
function mergeScan(accumulator, seed, concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }
  return mergeScan_1.mergeScan(accumulator, seed, concurrent)(this);
}
exports.mergeScan = mergeScan;
