/* */ 
"use strict";
var elementAt_1 = require('../operators/elementAt');
function elementAt(index, defaultValue) {
  return elementAt_1.elementAt(index, defaultValue)(this);
}
exports.elementAt = elementAt;
