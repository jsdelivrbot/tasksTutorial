/* */ 
"use strict";
var tap_1 = require('../operators/tap');
function _do(nextOrObserver, error, complete) {
  return tap_1.tap(nextOrObserver, error, complete)(this);
}
exports._do = _do;