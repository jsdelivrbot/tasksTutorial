/* */ 
"use strict";
var catchError_1 = require('../operators/catchError');
function _catch(selector) {
  return catchError_1.catchError(selector)(this);
}
exports._catch = _catch;
