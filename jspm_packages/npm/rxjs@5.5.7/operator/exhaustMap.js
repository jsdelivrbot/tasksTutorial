/* */ 
(function(process) {
  "use strict";
  var exhaustMap_1 = require('../operators/exhaustMap');
  function exhaustMap(project, resultSelector) {
    return exhaustMap_1.exhaustMap(project, resultSelector)(this);
  }
  exports.exhaustMap = exhaustMap;
})(require('process'));
