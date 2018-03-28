/* */ 
"use strict";
var root_1 = require('./util/root');
var toSubscriber_1 = require('./util/toSubscriber');
var observable_1 = require('./symbol/observable');
var pipe_1 = require('./util/pipe');
var Observable = (function() {
  function Observable(subscribe) {
    this._isScalar = false;
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable.prototype.lift = function(operator) {
    var observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  };
  Observable.prototype.subscribe = function(observerOrNext, error, complete) {
    var operator = this.operator;
    var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
    if (operator) {
      operator.call(sink, this.source);
    } else {
      sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
    }
    if (sink.syncErrorThrowable) {
      sink.syncErrorThrowable = false;
      if (sink.syncErrorThrown) {
        throw sink.syncErrorValue;
      }
    }
    return sink;
  };
  Observable.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.syncErrorThrown = true;
      sink.syncErrorValue = err;
      sink.error(err);
    }
  };
  Observable.prototype.forEach = function(next, PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
      if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
        PromiseCtor = root_1.root.Rx.config.Promise;
      } else if (root_1.root.Promise) {
        PromiseCtor = root_1.root.Promise;
      }
    }
    if (!PromiseCtor) {
      throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function(resolve, reject) {
      var subscription;
      subscription = _this.subscribe(function(value) {
        if (subscription) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscription.unsubscribe();
          }
        } else {
          next(value);
        }
      }, reject, resolve);
    });
  };
  Observable.prototype._subscribe = function(subscriber) {
    return this.source.subscribe(subscriber);
  };
  Observable.prototype[observable_1.observable] = function() {
    return this;
  };
  Observable.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i - 0] = arguments[_i];
    }
    if (operations.length === 0) {
      return this;
    }
    return pipe_1.pipeFromArray(operations)(this);
  };
  Observable.prototype.toPromise = function(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
      if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
        PromiseCtor = root_1.root.Rx.config.Promise;
      } else if (root_1.root.Promise) {
        PromiseCtor = root_1.root.Promise;
      }
    }
    if (!PromiseCtor) {
      throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable.create = function(subscribe) {
    return new Observable(subscribe);
  };
  return Observable;
}());
exports.Observable = Observable;