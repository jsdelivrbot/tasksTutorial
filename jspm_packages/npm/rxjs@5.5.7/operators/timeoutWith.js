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
var async_1 = require('../scheduler/async');
var isDate_1 = require('../util/isDate');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function timeoutWith(due, withObservable, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1.async;
  }
  return function(source) {
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
  };
}
exports.timeoutWith = timeoutWith;
var TimeoutWithOperator = (function() {
  function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
    this.waitFor = waitFor;
    this.absoluteTimeout = absoluteTimeout;
    this.withObservable = withObservable;
    this.scheduler = scheduler;
  }
  TimeoutWithOperator.prototype.call = function(subscriber, source) {
    return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
  };
  return TimeoutWithOperator;
}());
var TimeoutWithSubscriber = (function(_super) {
  __extends(TimeoutWithSubscriber, _super);
  function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
    _super.call(this, destination);
    this.absoluteTimeout = absoluteTimeout;
    this.waitFor = waitFor;
    this.withObservable = withObservable;
    this.scheduler = scheduler;
    this.action = null;
    this.scheduleTimeout();
  }
  TimeoutWithSubscriber.dispatchTimeout = function(subscriber) {
    var withObservable = subscriber.withObservable;
    subscriber._unsubscribeAndRecycle();
    subscriber.add(subscribeToResult_1.subscribeToResult(subscriber, withObservable));
  };
  TimeoutWithSubscriber.prototype.scheduleTimeout = function() {
    var action = this.action;
    if (action) {
      this.action = action.schedule(this, this.waitFor);
    } else {
      this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
    }
  };
  TimeoutWithSubscriber.prototype._next = function(value) {
    if (!this.absoluteTimeout) {
      this.scheduleTimeout();
    }
    _super.prototype._next.call(this, value);
  };
  TimeoutWithSubscriber.prototype._unsubscribe = function() {
    this.action = null;
    this.scheduler = null;
    this.withObservable = null;
  };
  return TimeoutWithSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
