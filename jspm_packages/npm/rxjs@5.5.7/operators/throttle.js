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
  var OuterSubscriber_1 = require('../OuterSubscriber');
  var subscribeToResult_1 = require('../util/subscribeToResult');
  exports.defaultThrottleConfig = {
    leading: true,
    trailing: false
  };
  function throttle(durationSelector, config) {
    if (config === void 0) {
      config = exports.defaultThrottleConfig;
    }
    return function(source) {
      return source.lift(new ThrottleOperator(durationSelector, config.leading, config.trailing));
    };
  }
  exports.throttle = throttle;
  var ThrottleOperator = (function() {
    function ThrottleOperator(durationSelector, leading, trailing) {
      this.durationSelector = durationSelector;
      this.leading = leading;
      this.trailing = trailing;
    }
    ThrottleOperator.prototype.call = function(subscriber, source) {
      return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
    };
    return ThrottleOperator;
  }());
  var ThrottleSubscriber = (function(_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
      _super.call(this, destination);
      this.destination = destination;
      this.durationSelector = durationSelector;
      this._leading = _leading;
      this._trailing = _trailing;
      this._hasTrailingValue = false;
    }
    ThrottleSubscriber.prototype._next = function(value) {
      if (this.throttled) {
        if (this._trailing) {
          this._hasTrailingValue = true;
          this._trailingValue = value;
        }
      } else {
        var duration = this.tryDurationSelector(value);
        if (duration) {
          this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
        }
        if (this._leading) {
          this.destination.next(value);
          if (this._trailing) {
            this._hasTrailingValue = true;
            this._trailingValue = value;
          }
        }
      }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function(value) {
      try {
        return this.durationSelector(value);
      } catch (err) {
        this.destination.error(err);
        return null;
      }
    };
    ThrottleSubscriber.prototype._unsubscribe = function() {
      var _a = this,
          throttled = _a.throttled,
          _trailingValue = _a._trailingValue,
          _hasTrailingValue = _a._hasTrailingValue,
          _trailing = _a._trailing;
      this._trailingValue = null;
      this._hasTrailingValue = false;
      if (throttled) {
        this.remove(throttled);
        this.throttled = null;
        throttled.unsubscribe();
      }
    };
    ThrottleSubscriber.prototype._sendTrailing = function() {
      var _a = this,
          destination = _a.destination,
          throttled = _a.throttled,
          _trailing = _a._trailing,
          _trailingValue = _a._trailingValue,
          _hasTrailingValue = _a._hasTrailingValue;
      if (throttled && _trailing && _hasTrailingValue) {
        destination.next(_trailingValue);
        this._trailingValue = null;
        this._hasTrailingValue = false;
      }
    };
    ThrottleSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this._sendTrailing();
      this._unsubscribe();
    };
    ThrottleSubscriber.prototype.notifyComplete = function() {
      this._sendTrailing();
      this._unsubscribe();
    };
    return ThrottleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
})(require('process'));
