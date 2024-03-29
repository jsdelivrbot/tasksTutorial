/* */ 
"use strict";
var BehaviorSubject_1 = require('../BehaviorSubject');
var multicast_1 = require('./multicast');
function publishBehavior(value) {
  return function(source) {
    return multicast_1.multicast(new BehaviorSubject_1.BehaviorSubject(value))(source);
  };
}
exports.publishBehavior = publishBehavior;
