/* */ 
"use strict";
var materialize_1 = require('../operators/materialize');
function materialize() {
  return materialize_1.materialize()(this);
}
exports.materialize = materialize;