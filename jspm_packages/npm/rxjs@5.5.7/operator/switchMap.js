/* */ 
"use strict";
var switchMap_1 = require('../operators/switchMap');
function switchMap(project, resultSelector) {
  return switchMap_1.switchMap(project, resultSelector)(this);
}
exports.switchMap = switchMap;
