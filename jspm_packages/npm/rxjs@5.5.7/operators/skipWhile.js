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
function skipWhile(predicate) {
  return function(source) {
    return source.lift(new SkipWhileOperator(predicate));
  };
}
exports.skipWhile = skipWhile;
var SkipWhileOperator = (function() {
  function SkipWhileOperator(predicate) {
    this.predicate = predicate;
  }
  SkipWhileOperator.prototype.call = function(subscriber, source) {
    return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
  };
  return SkipWhileOperator;
}());
var SkipWhileSubscriber = (function(_super) {
  __extends(SkipWhileSubscriber, _super);
  function SkipWhileSubscriber(destination, predicate) {
    _super.call(this, destination);
    this.predicate = predicate;
    this.skipping = true;
    this.index = 0;
  }
  SkipWhileSubscriber.prototype._next = function(value) {
    var destination = this.destination;
    if (this.skipping) {
      this.tryCallPredicate(value);
    }
    if (!this.skipping) {
      destination.next(value);
    }
  };
  SkipWhileSubscriber.prototype.tryCallPredicate = function(value) {
    try {
      var result = this.predicate(value, this.index++);
      this.skipping = Boolean(result);
    } catch (err) {
      this.destination.error(err);
    }
  };
  return SkipWhileSubscriber;
}(Subscriber_1.Subscriber));
