/* */ 
"use strict";
var find_1 = require('../operators/find');
function find(predicate, thisArg) {
  return find_1.find(predicate, thisArg)(this);
}
exports.find = find;
