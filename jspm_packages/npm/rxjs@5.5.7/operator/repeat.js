/* */ 
"use strict";
var repeat_1 = require('../operators/repeat');
function repeat(count) {
  if (count === void 0) {
    count = -1;
  }
  return repeat_1.repeat(count)(this);
}
exports.repeat = repeat;
