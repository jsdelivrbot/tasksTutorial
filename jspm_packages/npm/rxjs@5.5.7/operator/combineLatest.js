/* */ 
"use strict";
var combineLatest_1 = require('../operators/combineLatest');
function combineLatest() {
  var observables = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i - 0] = arguments[_i];
  }
  return combineLatest_1.combineLatest.apply(void 0, observables)(this);
}
exports.combineLatest = combineLatest;
