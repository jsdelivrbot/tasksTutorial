/* */ 
"use strict";
var shareReplay_1 = require('../operators/shareReplay');
function shareReplay(bufferSize, windowTime, scheduler) {
  return shareReplay_1.shareReplay(bufferSize, windowTime, scheduler)(this);
}
exports.shareReplay = shareReplay;
;
