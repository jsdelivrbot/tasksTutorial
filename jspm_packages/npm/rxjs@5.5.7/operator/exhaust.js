/* */ 
(function(process) {
  "use strict";
  var exhaust_1 = require('../operators/exhaust');
  function exhaust() {
    return exhaust_1.exhaust()(this);
  }
  exports.exhaust = exhaust;
})(require('process'));
