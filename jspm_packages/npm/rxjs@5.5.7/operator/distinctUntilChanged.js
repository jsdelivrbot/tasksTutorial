/* */ 
"use strict";
var distinctUntilChanged_1 = require('../operators/distinctUntilChanged');
function distinctUntilChanged(compare, keySelector) {
  return distinctUntilChanged_1.distinctUntilChanged(compare, keySelector)(this);
}
exports.distinctUntilChanged = distinctUntilChanged;