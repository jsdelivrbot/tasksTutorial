/* */ 
"use strict";
var last_1 = require('../operators/last');
function last(predicate, resultSelector, defaultValue) {
  return last_1.last(predicate, resultSelector, defaultValue)(this);
}
exports.last = last;
