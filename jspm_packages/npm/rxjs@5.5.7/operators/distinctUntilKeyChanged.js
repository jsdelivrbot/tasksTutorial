/* */ 
"use strict";
var distinctUntilChanged_1 = require('./distinctUntilChanged');
function distinctUntilKeyChanged(key, compare) {
  return distinctUntilChanged_1.distinctUntilChanged(function(x, y) {
    return compare ? compare(x[key], y[key]) : x[key] === y[key];
  });
}
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
