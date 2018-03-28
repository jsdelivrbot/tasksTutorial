/* */ 
"use strict";
var multicast_1 = require('./multicast');
var refCount_1 = require('./refCount');
var Subject_1 = require('../Subject');
function shareSubjectFactory() {
  return new Subject_1.Subject();
}
function share() {
  return function(source) {
    return refCount_1.refCount()(multicast_1.multicast(shareSubjectFactory)(source));
  };
}
exports.share = share;
;