/* */ 
"use strict";
var map_1 = require('../operators/map');
function map(project, thisArg) {
  return map_1.map(project, thisArg)(this);
}
exports.map = map;
