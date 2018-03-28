/* */ 
"use strict";
var onErrorResumeNext_1 = require('../operators/onErrorResumeNext');
function onErrorResumeNext() {
  var nextSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    nextSources[_i - 0] = arguments[_i];
  }
  return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, nextSources)(this);
}
exports.onErrorResumeNext = onErrorResumeNext;