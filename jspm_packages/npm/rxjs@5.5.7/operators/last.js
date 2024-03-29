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
var EmptyError_1 = require('../util/EmptyError');
function last(predicate, resultSelector, defaultValue) {
  return function(source) {
    return source.lift(new LastOperator(predicate, resultSelector, defaultValue, source));
  };
}
exports.last = last;
var LastOperator = (function() {
  function LastOperator(predicate, resultSelector, defaultValue, source) {
    this.predicate = predicate;
    this.resultSelector = resultSelector;
    this.defaultValue = defaultValue;
    this.source = source;
  }
  LastOperator.prototype.call = function(observer, source) {
    return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
  };
  return LastOperator;
}());
var LastSubscriber = (function(_super) {
  __extends(LastSubscriber, _super);
  function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
    _super.call(this, destination);
    this.predicate = predicate;
    this.resultSelector = resultSelector;
    this.defaultValue = defaultValue;
    this.source = source;
    this.hasValue = false;
    this.index = 0;
    if (typeof defaultValue !== 'undefined') {
      this.lastValue = defaultValue;
      this.hasValue = true;
    }
  }
  LastSubscriber.prototype._next = function(value) {
    var index = this.index++;
    if (this.predicate) {
      this._tryPredicate(value, index);
    } else {
      if (this.resultSelector) {
        this._tryResultSelector(value, index);
        return;
      }
      this.lastValue = value;
      this.hasValue = true;
    }
  };
  LastSubscriber.prototype._tryPredicate = function(value, index) {
    var result;
    try {
      result = this.predicate(value, index, this.source);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    if (result) {
      if (this.resultSelector) {
        this._tryResultSelector(value, index);
        return;
      }
      this.lastValue = value;
      this.hasValue = true;
    }
  };
  LastSubscriber.prototype._tryResultSelector = function(value, index) {
    var result;
    try {
      result = this.resultSelector(value, index);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.lastValue = result;
    this.hasValue = true;
  };
  LastSubscriber.prototype._complete = function() {
    var destination = this.destination;
    if (this.hasValue) {
      destination.next(this.lastValue);
      destination.complete();
    } else {
      destination.error(new EmptyError_1.EmptyError);
    }
  };
  return LastSubscriber;
}(Subscriber_1.Subscriber));
