/* */ 
"use strict";
var debounce_1 = require('../operators/debounce');
function debounce(durationSelector) {
  return debounce_1.debounce(durationSelector)(this);
}
exports.debounce = debounce;
