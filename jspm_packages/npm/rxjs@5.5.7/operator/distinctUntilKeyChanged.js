/* */ 
"use strict";
var distinctUntilKeyChanged_1 = require('../operators/distinctUntilKeyChanged');
function distinctUntilKeyChanged(key, compare) {
  return distinctUntilKeyChanged_1.distinctUntilKeyChanged(key, compare)(this);
}
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
