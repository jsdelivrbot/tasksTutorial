/* */ 
"use strict";
var takeUntil_1 = require('../operators/takeUntil');
function takeUntil(notifier) {
  return takeUntil_1.takeUntil(notifier)(this);
}
exports.takeUntil = takeUntil;