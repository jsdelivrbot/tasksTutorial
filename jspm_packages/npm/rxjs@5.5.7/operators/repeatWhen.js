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
var Subject_1 = require('../Subject');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function repeatWhen(notifier) {
  return function(source) {
    return source.lift(new RepeatWhenOperator(notifier));
  };
}
exports.repeatWhen = repeatWhen;
var RepeatWhenOperator = (function() {
  function RepeatWhenOperator(notifier) {
    this.notifier = notifier;
  }
  RepeatWhenOperator.prototype.call = function(subscriber, source) {
    return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
  };
  return RepeatWhenOperator;
}());
var RepeatWhenSubscriber = (function(_super) {
  __extends(RepeatWhenSubscriber, _super);
  function RepeatWhenSubscriber(destination, notifier, source) {
    _super.call(this, destination);
    this.notifier = notifier;
    this.source = source;
    this.sourceIsBeingSubscribedTo = true;
  }
  RepeatWhenSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
    this.sourceIsBeingSubscribedTo = true;
    this.source.subscribe(this);
  };
  RepeatWhenSubscriber.prototype.notifyComplete = function(innerSub) {
    if (this.sourceIsBeingSubscribedTo === false) {
      return _super.prototype.complete.call(this);
    }
  };
  RepeatWhenSubscriber.prototype.complete = function() {
    this.sourceIsBeingSubscribedTo = false;
    if (!this.isStopped) {
      if (!this.retries) {
        this.subscribeToRetries();
      } else if (this.retriesSubscription.closed) {
        return _super.prototype.complete.call(this);
      }
      this._unsubscribeAndRecycle();
      this.notifications.next();
    }
  };
  RepeatWhenSubscriber.prototype._unsubscribe = function() {
    var _a = this,
        notifications = _a.notifications,
        retriesSubscription = _a.retriesSubscription;
    if (notifications) {
      notifications.unsubscribe();
      this.notifications = null;
    }
    if (retriesSubscription) {
      retriesSubscription.unsubscribe();
      this.retriesSubscription = null;
    }
    this.retries = null;
  };
  RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function() {
    var _a = this,
        notifications = _a.notifications,
        retries = _a.retries,
        retriesSubscription = _a.retriesSubscription;
    this.notifications = null;
    this.retries = null;
    this.retriesSubscription = null;
    _super.prototype._unsubscribeAndRecycle.call(this);
    this.notifications = notifications;
    this.retries = retries;
    this.retriesSubscription = retriesSubscription;
    return this;
  };
  RepeatWhenSubscriber.prototype.subscribeToRetries = function() {
    this.notifications = new Subject_1.Subject();
    var retries = tryCatch_1.tryCatch(this.notifier)(this.notifications);
    if (retries === errorObject_1.errorObject) {
      return _super.prototype.complete.call(this);
    }
    this.retries = retries;
    this.retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
  };
  return RepeatWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
