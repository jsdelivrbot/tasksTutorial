/* */ 
"use strict";
var mergeAll_1 = require('../operators/mergeAll');
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }
  return mergeAll_1.mergeAll(concurrent)(this);
}
exports.mergeAll = mergeAll;