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
var EmptyObservable_1 = require('../observable/EmptyObservable');
function repeat(count) {
  if (count === void 0) {
    count = -1;
  }
  return function(source) {
    if (count === 0) {
      return new EmptyObservable_1.EmptyObservable();
    } else if (count < 0) {
      return source.lift(new RepeatOperator(-1, source));
    } else {
      return source.lift(new RepeatOperator(count - 1, source));
    }
  };
}
exports.repeat = repeat;
var RepeatOperator = (function() {
  function RepeatOperator(count, source) {
    this.count = count;
    this.source = source;
  }
  RepeatOperator.prototype.call = function(subscriber, source) {
    return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
  };
  return RepeatOperator;
}());
var RepeatSubscriber = (function(_super) {
  __extends(RepeatSubscriber, _super);
  function RepeatSubscriber(destination, count, source) {
    _super.call(this, destination);
    this.count = count;
    this.source = source;
  }
  RepeatSubscriber.prototype.complete = function() {
    if (!this.isStopped) {
      var _a = this,
          source = _a.source,
          count = _a.count;
      if (count === 0) {
        return _super.prototype.complete.call(this);
      } else if (count > -1) {
        this.count = count - 1;
      }
      source.subscribe(this._unsubscribeAndRecycle());
    }
  };
  return RepeatSubscriber;
}(Subscriber_1.Subscriber));
