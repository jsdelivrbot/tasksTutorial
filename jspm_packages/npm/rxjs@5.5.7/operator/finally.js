/* */ 
"use strict";
var finalize_1 = require('../operators/finalize');
function _finally(callback) {
  return finalize_1.finalize(callback)(this);
}
exports._finally = _finally;
