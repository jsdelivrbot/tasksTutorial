/* */ 
"use strict";
var scan_1 = require('../operators/scan');
function scan(accumulator, seed) {
  if (arguments.length >= 2) {
    return scan_1.scan(accumulator, seed)(this);
  }
  return scan_1.scan(accumulator)(this);
}
exports.scan = scan;
