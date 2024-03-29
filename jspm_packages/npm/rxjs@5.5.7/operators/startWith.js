/* */ 
"use strict";
var ArrayObservable_1 = require('../observable/ArrayObservable');
var ScalarObservable_1 = require('../observable/ScalarObservable');
var EmptyObservable_1 = require('../observable/EmptyObservable');
var concat_1 = require('../observable/concat');
var isScheduler_1 = require('../util/isScheduler');
function startWith() {
  var array = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    array[_i - 0] = arguments[_i];
  }
  return function(source) {
    var scheduler = array[array.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
      array.pop();
    } else {
      scheduler = null;
    }
    var len = array.length;
    if (len === 1) {
      return concat_1.concat(new ScalarObservable_1.ScalarObservable(array[0], scheduler), source);
    } else if (len > 1) {
      return concat_1.concat(new ArrayObservable_1.ArrayObservable(array, scheduler), source);
    } else {
      return concat_1.concat(new EmptyObservable_1.EmptyObservable(scheduler), source);
    }
  };
}
exports.startWith = startWith;
