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
  var tryCatch_1 = require('../util/tryCatch');
  var errorObject_1 = require('../util/errorObject');
  var OuterSubscriber_1 = require('../OuterSubscriber');
  var subscribeToResult_1 = require('../util/subscribeToResult');
  function audit(durationSelector) {
    return function auditOperatorFunction(source) {
      return source.lift(new AuditOperator(durationSelector));
    };
  }
  exports.audit = audit;
  var AuditOperator = (function() {
    function AuditOperator(durationSelector) {
      this.durationSelector = durationSelector;
    }
    AuditOperator.prototype.call = function(subscriber, source) {
      return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
    };
    return AuditOperator;
  }());
  var AuditSubscriber = (function(_super) {
    __extends(AuditSubscriber, _super);
    function AuditSubscriber(destination, durationSelector) {
      _super.call(this, destination);
      this.durationSelector = durationSelector;
      this.hasValue = false;
    }
    AuditSubscriber.prototype._next = function(value) {
      this.value = value;
      this.hasValue = true;
      if (!this.throttled) {
        var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
        if (duration === errorObject_1.errorObject) {
          this.destination.error(errorObject_1.errorObject.e);
        } else {
          var innerSubscription = subscribeToResult_1.subscribeToResult(this, duration);
          if (innerSubscription.closed) {
            this.clearThrottle();
          } else {
            this.add(this.throttled = innerSubscription);
          }
        }
      }
    };
    AuditSubscriber.prototype.clearThrottle = function() {
      var _a = this,
          value = _a.value,
          hasValue = _a.hasValue,
          throttled = _a.throttled;
      if (throttled) {
        this.remove(throttled);
        this.throttled = null;
        throttled.unsubscribe();
      }
      if (hasValue) {
        this.value = null;
        this.hasValue = false;
        this.destination.next(value);
      }
    };
    AuditSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
      this.clearThrottle();
    };
    AuditSubscriber.prototype.notifyComplete = function() {
      this.clearThrottle();
    };
    return AuditSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
})(require('process'));
