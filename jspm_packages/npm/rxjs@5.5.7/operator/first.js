/* */ 
"use strict";
var first_1 = require('../operators/first');
function first(predicate, resultSelector, defaultValue) {
  return first_1.first(predicate, resultSelector, defaultValue)(this);
}
exports.first = first;
