/* */ 
"use strict";
var multicast_1 = require('../operators/multicast');
function multicast(subjectOrSubjectFactory, selector) {
  return multicast_1.multicast(subjectOrSubjectFactory, selector)(this);
}
exports.multicast = multicast;
