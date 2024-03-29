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
var Subscriber_1 = require('../Subscriber');
var TimeoutError_1 = require('../util/TimeoutError');
function timeout(due, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1.async;
  }
  var absoluteTimeout = isDate_1.isDate(due);
  var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
  return function(source) {
    return source.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError_1.TimeoutError()));
  };
}
exports.timeout = timeout;
var TimeoutOperator = (function() {
  function TimeoutOperator(waitFor, absoluteTimeout, scheduler, errorInstance) {
    this.waitFor = waitFor;
    this.absoluteTimeout = absoluteTimeout;
    this.scheduler = scheduler;
    this.errorInstance = errorInstance;
  }
  TimeoutOperator.prototype.call = function(subscriber, source) {
    return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
  };
  return TimeoutOperator;
}());
var TimeoutSubscriber = (function(_super) {
  __extends(TimeoutSubscriber, _super);
  function TimeoutSubscriber(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
    _super.call(this, destination);
    this.absoluteTimeout = absoluteTimeout;
    this.waitFor = waitFor;
    this.scheduler = scheduler;
    this.errorInstance = errorInstance;
    this.action = null;
    this.scheduleTimeout();
  }
  TimeoutSubscriber.dispatchTimeout = function(subscriber) {
    subscriber.error(subscriber.errorInstance);
  };
  TimeoutSubscriber.prototype.scheduleTimeout = function() {
    var action = this.action;
    if (action) {
      this.action = action.schedule(this, this.waitFor);
    } else {
      this.add(this.action = this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, this));
    }
  };
  TimeoutSubscriber.prototype._next = function(value) {
    if (!this.absoluteTimeout) {
      this.scheduleTimeout();
    }
    _super.prototype._next.call(this, value);
  };
  TimeoutSubscriber.prototype._unsubscribe = function() {
    this.action = null;
    this.scheduler = null;
    this.errorInstance = null;
  };
  return TimeoutSubscriber;
}(Subscriber_1.Subscriber));
