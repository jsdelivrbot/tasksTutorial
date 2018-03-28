/* */ 
"use strict";
var startWith_1 = require('../operators/startWith');
function startWith() {
  var array = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    array[_i - 0] = arguments[_i];
  }
  return startWith_1.startWith.apply(void 0, array)(this);
}
exports.startWith = startWith;
