/* */ 
"use strict";
var filter_1 = require('../operators/filter');
function filter(predicate, thisArg) {
  return filter_1.filter(predicate, thisArg)(this);
}
exports.filter = filter;
