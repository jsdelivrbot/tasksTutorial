/* */ 
"use strict";
var sequenceEqual_1 = require('../operators/sequenceEqual');
function sequenceEqual(compareTo, comparor) {
  return sequenceEqual_1.sequenceEqual(compareTo, comparor)(this);
}
exports.sequenceEqual = sequenceEqual;
