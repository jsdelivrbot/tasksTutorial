/* */ 
"use strict";
var dematerialize_1 = require('../operators/dematerialize');
function dematerialize() {
  return dematerialize_1.dematerialize()(this);
}
exports.dematerialize = dematerialize;
