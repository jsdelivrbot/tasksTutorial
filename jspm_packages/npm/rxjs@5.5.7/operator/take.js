/* */ 
"use strict";
var take_1 = require('../operators/take');
function take(count) {
  return take_1.take(count)(this);
}
exports.take = take;