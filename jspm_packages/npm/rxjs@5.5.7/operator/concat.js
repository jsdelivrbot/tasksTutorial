/* */ 
"use strict";
var concat_1 = require('../operators/concat');
var concat_2 = require('../observable/concat');
exports.concatStatic = concat_2.concat;
function concat() {
  var observables = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i - 0] = arguments[_i];
  }
  return concat_1.concat.apply(void 0, observables)(this);
}
exports.concat = concat;
