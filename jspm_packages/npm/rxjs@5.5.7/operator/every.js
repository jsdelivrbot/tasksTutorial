/* */ 
"use strict";
var every_1 = require('../operators/every');
function every(predicate, thisArg) {
  return every_1.every(predicate, thisArg)(this);
}
exports.every = every;
