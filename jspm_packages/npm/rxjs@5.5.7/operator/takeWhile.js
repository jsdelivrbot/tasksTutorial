/* */ 
"use strict";
var takeWhile_1 = require('../operators/takeWhile');
function takeWhile(predicate) {
  return takeWhile_1.takeWhile(predicate)(this);
}
exports.takeWhile = takeWhile;
