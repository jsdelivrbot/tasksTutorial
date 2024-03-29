/* */ 
"use strict";
var mergeMapTo_1 = require('../operators/mergeMapTo');
function mergeMapTo(innerObservable, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }
  return mergeMapTo_1.mergeMapTo(innerObservable, resultSelector, concurrent)(this);
}
exports.mergeMapTo = mergeMapTo;
