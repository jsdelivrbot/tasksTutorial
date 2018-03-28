/* */ 
"use strict";
var withLatestFrom_1 = require('../operators/withLatestFrom');
function withLatestFrom() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i - 0] = arguments[_i];
  }
  return withLatestFrom_1.withLatestFrom.apply(void 0, args)(this);
}
exports.withLatestFrom = withLatestFrom;
