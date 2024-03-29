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
var isArray_1 = require('../util/isArray');
var isArrayLike_1 = require('../util/isArrayLike');
var isPromise_1 = require('../util/isPromise');
var PromiseObservable_1 = require('./PromiseObservable');
var IteratorObservable_1 = require('./IteratorObservable');
var ArrayObservable_1 = require('./ArrayObservable');
var ArrayLikeObservable_1 = require('./ArrayLikeObservable');
var iterator_1 = require('../symbol/iterator');
var Observable_1 = require('../Observable');
var observeOn_1 = require('../operators/observeOn');
var observable_1 = require('../symbol/observable');
var FromObservable = (function(_super) {
  __extends(FromObservable, _super);
  function FromObservable(ish, scheduler) {
    _super.call(this, null);
    this.ish = ish;
    this.scheduler = scheduler;
  }
  FromObservable.create = function(ish, scheduler) {
    if (ish != null) {
      if (typeof ish[observable_1.observable] === 'function') {
        if (ish instanceof Observable_1.Observable && !scheduler) {
          return ish;
        }
        return new FromObservable(ish, scheduler);
      } else if (isArray_1.isArray(ish)) {
        return new ArrayObservable_1.ArrayObservable(ish, scheduler);
      } else if (isPromise_1.isPromise(ish)) {
        return new PromiseObservable_1.PromiseObservable(ish, scheduler);
      } else if (typeof ish[iterator_1.iterator] === 'function' || typeof ish === 'string') {
        return new IteratorObservable_1.IteratorObservable(ish, scheduler);
      } else if (isArrayLike_1.isArrayLike(ish)) {
        return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
      }
    }
    throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
  };
  FromObservable.prototype._subscribe = function(subscriber) {
    var ish = this.ish;
    var scheduler = this.scheduler;
    if (scheduler == null) {
      return ish[observable_1.observable]().subscribe(subscriber);
    } else {
      return ish[observable_1.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
    }
  };
  return FromObservable;
}(Observable_1.Observable));
exports.FromObservable = FromObservable;
