/* */ 
"use strict";
var delayWhen_1 = require('../operators/delayWhen');
function delayWhen(delayDurationSelector, subscriptionDelay) {
  return delayWhen_1.delayWhen(delayDurationSelector, subscriptionDelay)(this);
}
exports.delayWhen = delayWhen;