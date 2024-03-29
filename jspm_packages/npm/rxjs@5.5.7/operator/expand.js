/* */ 
"use strict";
var expand_1 = require('../operators/expand');
function expand(project, concurrent, scheduler) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }
  if (scheduler === void 0) {
    scheduler = undefined;
  }
  concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
  return expand_1.expand(project, concurrent, scheduler)(this);
}
exports.expand = expand;
