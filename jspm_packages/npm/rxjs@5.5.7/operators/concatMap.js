/* */ 
"use strict";
var mergeMap_1 = require('./mergeMap');
function concatMap(project, resultSelector) {
  return mergeMap_1.mergeMap(project, resultSelector, 1);
}
exports.concatMap = concatMap;
