/* */ 
"use strict";
var switchMapTo_1 = require('../operators/switchMapTo');
function switchMapTo(innerObservable, resultSelector) {
  return switchMapTo_1.switchMapTo(innerObservable, resultSelector)(this);
}
exports.switchMapTo = switchMapTo;
