/* */ 
"use strict";
var partition_1 = require('../operators/partition');
function partition(predicate, thisArg) {
  return partition_1.partition(predicate, thisArg)(this);
}
exports.partition = partition;
