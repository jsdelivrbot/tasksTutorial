/* */ 
"use strict";
var sample_1 = require('../operators/sample');
function sample(notifier) {
  return sample_1.sample(notifier)(this);
}
exports.sample = sample;
