/* */ 
"use strict";
var concatMap_1 = require('../operators/concatMap');
function concatMap(project, resultSelector) {
  return concatMap_1.concatMap(project, resultSelector)(this);
}
exports.concatMap = concatMap;
