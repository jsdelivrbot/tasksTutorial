/* */ 
"use strict";
var race_1 = require('../operators/race');
var race_2 = require('../observable/race');
exports.raceStatic = race_2.race;
function race() {
  var observables = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i - 0] = arguments[_i];
  }
  return race_1.race.apply(void 0, observables)(this);
}
exports.race = race;
