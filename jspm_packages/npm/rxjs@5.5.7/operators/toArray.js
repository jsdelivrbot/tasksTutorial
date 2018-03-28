/* */ 
"use strict";
var reduce_1 = require('./reduce');
function toArrayReducer(arr, item, index) {
  if (index === 0) {
    return [item];
  }
  arr.push(item);
  return arr;
}
function toArray() {
  return reduce_1.reduce(toArrayReducer, []);
}
exports.toArray = toArray;
