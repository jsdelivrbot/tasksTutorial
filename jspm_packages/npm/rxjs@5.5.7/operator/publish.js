/* */ 
"use strict";
var publish_1 = require('../operators/publish');
function publish(selector) {
  return publish_1.publish(selector)(this);
}
exports.publish = publish;
