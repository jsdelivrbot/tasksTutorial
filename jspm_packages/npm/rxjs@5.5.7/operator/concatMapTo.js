/* */ 
"use strict";
var concatMapTo_1 = require('../operators/concatMapTo');
function concatMapTo(innerObservable, resultSelector) {
  return concatMapTo_1.concatMapTo(innerObservable, resultSelector)(this);
}
exports.concatMapTo = concatMapTo;