/* */ 
"use strict";
var mergeMap_1 = require('./mergeMap');
var identity_1 = require('../util/identity');
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }
  return mergeMap_1.mergeMap(identity_1.identity, null, concurrent);
}
exports.mergeAll = mergeAll;
