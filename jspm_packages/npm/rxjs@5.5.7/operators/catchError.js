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
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function catchError(selector) {
  return function catchErrorOperatorFunction(source) {
    var operator = new CatchOperator(selector);
    var caught = source.lift(operator);
    return (operator.caught = caught);
  };
}
exports.catchError = catchError;
var CatchOperator = (function() {
  function CatchOperator(selector) {
    this.selector = selector;
  }
  CatchOperator.prototype.call = function(subscriber, source) {
    return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
  };
  return CatchOperator;
}());
var CatchSubscriber = (function(_super) {
  __extends(CatchSubscriber, _super);
  function CatchSubscriber(destination, selector, caught) {
    _super.call(this, destination);
    this.selector = selector;
    this.caught = caught;
  }
  CatchSubscriber.prototype.error = function(err) {
    if (!this.isStopped) {
      var result = void 0;
      try {
        result = this.selector(err, this.caught);
      } catch (err2) {
        _super.prototype.error.call(this, err2);
        return;
      }
      this._unsubscribeAndRecycle();
      this.add(subscribeToResult_1.subscribeToResult(this, result));
    }
  };
  return CatchSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
