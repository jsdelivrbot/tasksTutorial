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
var isFunction_1 = require('./util/isFunction');
var Subscription_1 = require('./Subscription');
var Observer_1 = require('./Observer');
var rxSubscriber_1 = require('./symbol/rxSubscriber');
var Subscriber = (function(_super) {
  __extends(Subscriber, _super);
  function Subscriber(destinationOrNext, error, complete) {
    _super.call(this);
    this.syncErrorValue = null;
    this.syncErrorThrown = false;
    this.syncErrorThrowable = false;
    this.isStopped = false;
    switch (arguments.length) {
      case 0:
        this.destination = Observer_1.empty;
        break;
      case 1:
        if (!destinationOrNext) {
          this.destination = Observer_1.empty;
          break;
        }
        if (typeof destinationOrNext === 'object') {
          if (destinationOrNext instanceof Subscriber) {
            this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
            this.destination = destinationOrNext;
            this.destination.add(this);
          } else {
            this.syncErrorThrowable = true;
            this.destination = new SafeSubscriber(this, destinationOrNext);
          }
          break;
        }
      default:
        this.syncErrorThrowable = true;
        this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
        break;
    }
  }
  Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function() {
    return this;
  };
  Subscriber.create = function(next, error, complete) {
    var subscriber = new Subscriber(next, error, complete);
    subscriber.syncErrorThrowable = false;
    return subscriber;
  };
  Subscriber.prototype.next = function(value) {
    if (!this.isStopped) {
      this._next(value);
    }
  };
  Subscriber.prototype.error = function(err) {
    if (!this.isStopped) {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber.prototype.complete = function() {
    if (!this.isStopped) {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber.prototype.unsubscribe = function() {
    if (this.closed) {
      return;
    }
    this.isStopped = true;
    _super.prototype.unsubscribe.call(this);
  };
  Subscriber.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber.prototype._error = function(err) {
    this.destination.error(err);
    this.unsubscribe();
  };
  Subscriber.prototype._complete = function() {
    this.destination.complete();
    this.unsubscribe();
  };
  Subscriber.prototype._unsubscribeAndRecycle = function() {
    var _a = this,
        _parent = _a._parent,
        _parents = _a._parents;
    this._parent = null;
    this._parents = null;
    this.unsubscribe();
    this.closed = false;
    this.isStopped = false;
    this._parent = _parent;
    this._parents = _parents;
    return this;
  };
  return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var SafeSubscriber = (function(_super) {
  __extends(SafeSubscriber, _super);
  function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
    _super.call(this);
    this._parentSubscriber = _parentSubscriber;
    var next;
    var context = this;
    if (isFunction_1.isFunction(observerOrNext)) {
      next = observerOrNext;
    } else if (observerOrNext) {
      next = observerOrNext.next;
      error = observerOrNext.error;
      complete = observerOrNext.complete;
      if (observerOrNext !== Observer_1.empty) {
        context = Object.create(observerOrNext);
        if (isFunction_1.isFunction(context.unsubscribe)) {
          this.add(context.unsubscribe.bind(context));
        }
        context.unsubscribe = this.unsubscribe.bind(this);
      }
    }
    this._context = context;
    this._next = next;
    this._error = error;
    this._complete = complete;
  }
  SafeSubscriber.prototype.next = function(value) {
    if (!this.isStopped && this._next) {
      var _parentSubscriber = this._parentSubscriber;
      if (!_parentSubscriber.syncErrorThrowable) {
        this.__tryOrUnsub(this._next, value);
      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
        this.unsubscribe();
      }
    }
  };
  SafeSubscriber.prototype.error = function(err) {
    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;
      if (this._error) {
        if (!_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._error, err);
          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, this._error, err);
          this.unsubscribe();
        }
      } else if (!_parentSubscriber.syncErrorThrowable) {
        this.unsubscribe();
        throw err;
      } else {
        _parentSubscriber.syncErrorValue = err;
        _parentSubscriber.syncErrorThrown = true;
        this.unsubscribe();
      }
    }
  };
  SafeSubscriber.prototype.complete = function() {
    var _this = this;
    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;
      if (this._complete) {
        var wrappedComplete = function() {
          return _this._complete.call(_this._context);
        };
        if (!_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(wrappedComplete);
          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, wrappedComplete);
          this.unsubscribe();
        }
      } else {
        this.unsubscribe();
      }
    }
  };
  SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
    try {
      fn.call(this._context, value);
    } catch (err) {
      this.unsubscribe();
      throw err;
    }
  };
  SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
    try {
      fn.call(this._context, value);
    } catch (err) {
      parent.syncErrorValue = err;
      parent.syncErrorThrown = true;
      return true;
    }
    return false;
  };
  SafeSubscriber.prototype._unsubscribe = function() {
    var _parentSubscriber = this._parentSubscriber;
    this._context = null;
    this._parentSubscriber = null;
    _parentSubscriber.unsubscribe();
  };
  return SafeSubscriber;
}(Subscriber));
