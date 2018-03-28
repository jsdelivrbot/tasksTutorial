/* */ 
"use strict";
var zip_1 = require('../operators/zip');
function zipProto() {
  var observables = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i - 0] = arguments[_i];
  }
  return zip_1.zip.apply(void 0, observables)(this);
}
exports.zipProto = zipProto;
