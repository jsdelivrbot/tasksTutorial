/* */ 
"use strict";
var distinct_1 = require('../operators/distinct');
function distinct(keySelector, flushes) {
  return distinct_1.distinct(keySelector, flushes)(this);
}
exports.distinct = distinct;
