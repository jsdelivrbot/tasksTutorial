/* */ 
"use strict";
var retryWhen_1 = require('../operators/retryWhen');
function retryWhen(notifier) {
  return retryWhen_1.retryWhen(notifier)(this);
}
exports.retryWhen = retryWhen;
