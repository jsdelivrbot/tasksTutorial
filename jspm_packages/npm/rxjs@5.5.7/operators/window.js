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
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function window(windowBoundaries) {
  return function windowOperatorFunction(source) {
    return source.lift(new WindowOperator(windowBoundaries));
  };
}
exports.window = window;
var WindowOperator = (function() {
  function WindowOperator(windowBoundaries) {
    this.windowBoundaries = windowBoundaries;
  }
  WindowOperator.prototype.call = function(subscriber, source) {
    var windowSubscriber = new WindowSubscriber(subscriber);
    var sourceSubscription = source.subscribe(windowSubscriber);
    if (!sourceSubscription.closed) {
      windowSubscriber.add(subscribeToResult_1.subscribeToResult(windowSubscriber, this.windowBoundaries));
    }
    return sourceSubscription;
  };
  return WindowOperator;
}());
var WindowSubscriber = (function(_super) {
  __extends(WindowSubscriber, _super);
  function WindowSubscriber(destination) {
    _super.call(this, destination);
    this.window = new Subject_1.Subject();
    destination.next(this.window);
  }
  WindowSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
    this.openWindow();
  };
  WindowSubscriber.prototype.notifyError = function(error, innerSub) {
    this._error(error);
  };
  WindowSubscriber.prototype.notifyComplete = function(innerSub) {
    this._complete();
  };
  WindowSubscriber.prototype._next = function(value) {
    this.window.next(value);
  };
  WindowSubscriber.prototype._error = function(err) {
    this.window.error(err);
    this.destination.error(err);
  };
  WindowSubscriber.prototype._complete = function() {
    this.window.complete();
    this.destination.complete();
  };
  WindowSubscriber.prototype._unsubscribe = function() {
    this.window = null;
  };
  WindowSubscriber.prototype.openWindow = function() {
    var prevWindow = this.window;
    if (prevWindow) {
      prevWindow.complete();
    }
    var destination = this.destination;
    var newWindow = this.window = new Subject_1.Subject();
    destination.next(newWindow);
  };
  return WindowSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
