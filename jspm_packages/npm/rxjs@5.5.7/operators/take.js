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
var EmptyObservable_1 = require('../observable/EmptyObservable');
function take(count) {
  return function(source) {
    if (count === 0) {
      return new EmptyObservable_1.EmptyObservable();
    } else {
      return source.lift(new TakeOperator(count));
    }
  };
}
exports.take = take;
var TakeOperator = (function() {
  function TakeOperator(total) {
    this.total = total;
    if (this.total < 0) {
      throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
    }
  }
  TakeOperator.prototype.call = function(subscriber, source) {
    return source.subscribe(new TakeSubscriber(subscriber, this.total));
  };
  return TakeOperator;
}());
var TakeSubscriber = (function(_super) {
  __extends(TakeSubscriber, _super);
  function TakeSubscriber(destination, total) {
    _super.call(this, destination);
    this.total = total;
    this.count = 0;
  }
  TakeSubscriber.prototype._next = function(value) {
    var total = this.total;
    var count = ++this.count;
    if (count <= total) {
      this.destination.next(value);
      if (count === total) {
        this.destination.complete();
        this.unsubscribe();
      }
    }
  };
  return TakeSubscriber;
}(Subscriber_1.Subscriber));
