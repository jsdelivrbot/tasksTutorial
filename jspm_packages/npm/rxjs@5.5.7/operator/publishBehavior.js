/* */ 
"use strict";
var publishBehavior_1 = require('../operators/publishBehavior');
function publishBehavior(value) {
  return publishBehavior_1.publishBehavior(value)(this);
}
exports.publishBehavior = publishBehavior;
