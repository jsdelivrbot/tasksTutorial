/* */ 
"use strict";
var mapTo_1 = require('../operators/mapTo');
function mapTo(value) {
  return mapTo_1.mapTo(value)(this);
}
exports.mapTo = mapTo;
