/* */ 
(function(process) {
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
  var async_1 = require('../scheduler/async');
  var throttle_1 = require('./throttle');
  function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    if (config === void 0) {
      config = throttle_1.defaultThrottleConfig;
    }
    return function(source) {
      return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
    };
  }
  exports.throttleTime = throttleTime;
  var ThrottleTimeOperator = (function() {
    function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
      this.duration = duration;
      this.scheduler = scheduler;
      this.leading = leading;
      this.trailing = trailing;
    }
    ThrottleTimeOperator.prototype.call = function(subscriber, source) {
      return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
    };
    return ThrottleTimeOperator;
  }());
  var ThrottleTimeSubscriber = (function(_super) {
    __extends(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
      _super.call(this, destination);
      this.duration = duration;
      this.scheduler = scheduler;
      this.leading = leading;
      this.trailing = trailing;
      this._hasTrailingValue = false;
      this._trailingValue = null;
    }
    ThrottleTimeSubscriber.prototype._next = function(value) {
      if (this.throttled) {
        if (this.trailing) {
          this._trailingValue = value;
          this._hasTrailingValue = true;
        }
      } else {
        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, {subscriber: this}));
        if (this.leading) {
          this.destination.next(value);
        }
      }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function() {
      var throttled = this.throttled;
      if (throttled) {
        if (this.trailing && this._hasTrailingValue) {
          this.destination.next(this._trailingValue);
          this._trailingValue = null;
          this._hasTrailingValue = false;
        }
        throttled.unsubscribe();
        this.remove(throttled);
        this.throttled = null;
      }
    };
    return ThrottleTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchNext(arg) {
    var subscriber = arg.subscriber;
    subscriber.clearThrottle();
  }
})(require('process'));
