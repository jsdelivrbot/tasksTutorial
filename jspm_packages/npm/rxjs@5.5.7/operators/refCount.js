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
var Subscriber_1 = require('../Subscriber');
function refCount() {
  return function refCountOperatorFunction(source) {
    return source.lift(new RefCountOperator(source));
  };
}
exports.refCount = refCount;
var RefCountOperator = (function() {
  function RefCountOperator(connectable) {
    this.connectable = connectable;
  }
  RefCountOperator.prototype.call = function(subscriber, source) {
    var connectable = this.connectable;
    connectable._refCount++;
    var refCounter = new RefCountSubscriber(subscriber, connectable);
    var subscription = source.subscribe(refCounter);
    if (!refCounter.closed) {
      refCounter.connection = connectable.connect();
    }
    return subscription;
  };
  return RefCountOperator;
}());
var RefCountSubscriber = (function(_super) {
  __extends(RefCountSubscriber, _super);
  function RefCountSubscriber(destination, connectable) {
    _super.call(this, destination);
    this.connectable = connectable;
  }
  RefCountSubscriber.prototype._unsubscribe = function() {
    var connectable = this.connectable;
    if (!connectable) {
      this.connection = null;
      return;
    }
    this.connectable = null;
    var refCount = connectable._refCount;
    if (refCount <= 0) {
      this.connection = null;
      return;
    }
    connectable._refCount = refCount - 1;
    if (refCount > 1) {
      this.connection = null;
      return;
    }
    var connection = this.connection;
    var sharedConnection = connectable._connection;
    this.connection = null;
    if (sharedConnection && (!connection || sharedConnection === connection)) {
      sharedConnection.unsubscribe();
    }
  };
  return RefCountSubscriber;
}(Subscriber_1.Subscriber));
