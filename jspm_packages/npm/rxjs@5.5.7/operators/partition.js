/* */ 
"use strict";
var not_1 = require('../util/not');
var filter_1 = require('./filter');
function partition(predicate, thisArg) {
  return function(source) {
    return [filter_1.filter(predicate, thisArg)(source), filter_1.filter(not_1.not(predicate, thisArg))(source)];
  };
}
exports.partition = partition;
