/* */ 
"use strict";
var repeatWhen_1 = require('../operators/repeatWhen');
function repeatWhen(notifier) {
  return repeatWhen_1.repeatWhen(notifier)(this);
}
exports.repeatWhen = repeatWhen;