/* */ 
"use strict";
var single_1 = require('../operators/single');
function single(predicate) {
  return single_1.single(predicate)(this);
}
exports.single = single;
