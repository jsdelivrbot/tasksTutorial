/* */ 
"use strict";
var groupBy_1 = require('../operators/groupBy');
exports.GroupedObservable = groupBy_1.GroupedObservable;
function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
  return groupBy_1.groupBy(keySelector, elementSelector, durationSelector, subjectSelector)(this);
}
exports.groupBy = groupBy;
