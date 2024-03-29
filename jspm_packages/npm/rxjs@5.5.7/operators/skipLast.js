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
var ArgumentOutOfRangeError_1 = require('../util/ArgumentOutOfRangeError');
function skipLast(count) {
  return function(source) {
    return source.lift(new SkipLastOperator(count));
  };
}
exports.skipLast = skipLast;
var SkipLastOperator = (function() {
  function SkipLastOperator(_skipCount) {
    this._skipCount = _skipCount;
    if (this._skipCount < 0) {
      throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
    }
  }
  SkipLastOperator.prototype.call = function(subscriber, source) {
    if (this._skipCount === 0) {
      return source.subscribe(new Subscriber_1.Subscriber(subscriber));
    } else {
      return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
    }
  };
  return SkipLastOperator;
}());
var SkipLastSubscriber = (function(_super) {
  __extends(SkipLastSubscriber, _super);
  function SkipLastSubscriber(destination, _skipCount) {
    _super.call(this, destination);
    this._skipCount = _skipCount;
    this._count = 0;
    this._ring = new Array(_skipCount);
  }
  SkipLastSubscriber.prototype._next = function(value) {
    var skipCount = this._skipCount;
    var count = this._count++;
    if (count < skipCount) {
      this._ring[count] = value;
    } else {
      var currentIndex = count % skipCount;
      var ring = this._ring;
      var oldValue = ring[currentIndex];
      ring[currentIndex] = value;
      this.destination.next(oldValue);
    }
  };
  return SkipLastSubscriber;
}(Subscriber_1.Subscriber));
