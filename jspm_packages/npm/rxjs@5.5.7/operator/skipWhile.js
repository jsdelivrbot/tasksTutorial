/* */ 
"use strict";
var skipWhile_1 = require('../operators/skipWhile');
function skipWhile(predicate) {
  return skipWhile_1.skipWhile(predicate)(this);
}
exports.skipWhile = skipWhile;
