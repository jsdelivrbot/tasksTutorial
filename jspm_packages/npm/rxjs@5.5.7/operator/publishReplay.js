/* */ 
"use strict";
var publishReplay_1 = require('../operators/publishReplay');
function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
  return publishReplay_1.publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler)(this);
}
exports.publishReplay = publishReplay;
