/* */ 
"use strict";
var skip_1 = require('../operators/skip');
function skip(count) {
  return skip_1.skip(count)(this);
}
exports.skip = skip;
