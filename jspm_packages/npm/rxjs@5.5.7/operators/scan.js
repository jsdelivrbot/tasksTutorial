/* */ 
"use strict";
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
function scan(accumulator, seed) {
  var hasSeed = false;
  if (arguments.length >= 2) {
    hasSeed = true;
  }
  return function scanOperatorFunction(source) {
    return source.lift(new ScanOperator(accumulator, seed, hasSeed));
  };
}
exports.scan = scan;
var ScanOperator = (function() {
  function ScanOperator(accumulator, seed, hasSeed) {
    if (hasSeed === void 0) {
      hasSeed = false;
    }
    this.accumulator = accumulator;
    this.seed = seed;
    this.hasSeed = hasSeed;
  }
  ScanOperator.prototype.call = function(subscriber, source) {
    return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
  };
  return ScanOperator;
}());
var ScanSubscriber = (function(_super) {
  __extends(ScanSubscriber, _super);
  function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
    _super.call(this, destination);
    this.accumulator = accumulator;
    this._seed = _seed;
    this.hasSeed = hasSeed;
    this.index = 0;
  }
  Object.defineProperty(ScanSubscriber.prototype, "seed", {
    get: function() {
      return this._seed;
    },
    set: function(value) {
      this.hasSeed = true;
      this._seed = value;
    },
    enumerable: true,
    configurable: true
  });
  ScanSubscriber.prototype._next = function(value) {
    if (!this.hasSeed) {
      this.seed = value;
      this.destination.next(value);
    } else {
      return this._tryNext(value);
    }
  };
  ScanSubscriber.prototype._tryNext = function(value) {
    var index = this.index++;
    var result;
    try {
      result = this.accumulator(this.seed, value, index);
    } catch (err) {
      this.destination.error(err);
    }
    this.seed = result;
    this.destination.next(result);
  };
  return ScanSubscriber;
}(Subscriber_1.Subscriber));
