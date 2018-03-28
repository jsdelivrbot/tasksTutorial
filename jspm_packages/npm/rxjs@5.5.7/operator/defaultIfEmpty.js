/* */ 
"use strict";
var defaultIfEmpty_1 = require('../operators/defaultIfEmpty');
function defaultIfEmpty(defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = null;
  }
  return defaultIfEmpty_1.defaultIfEmpty(defaultValue)(this);
}
exports.defaultIfEmpty = defaultIfEmpty;