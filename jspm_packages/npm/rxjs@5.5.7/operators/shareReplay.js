/* */ 
"use strict";
var ReplaySubject_1 = require('../ReplaySubject');
function shareReplay(bufferSize, windowTime, scheduler) {
  return function(source) {
    return source.lift(shareReplayOperator(bufferSize, windowTime, scheduler));
  };
}
exports.shareReplay = shareReplay;
function shareReplayOperator(bufferSize, windowTime, scheduler) {
  var subject;
  var refCount = 0;
  var subscription;
  var hasError = false;
  var isComplete = false;
  return function shareReplayOperation(source) {
    refCount++;
    if (!subject || hasError) {
      hasError = false;
      subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
      subscription = source.subscribe({
        next: function(value) {
          subject.next(value);
        },
        error: function(err) {
          hasError = true;
          subject.error(err);
        },
        complete: function() {
          isComplete = true;
          subject.complete();
        }
      });
    }
    var innerSub = subject.subscribe(this);
    return function() {
      refCount--;
      innerSub.unsubscribe();
      if (subscription && refCount === 0 && isComplete) {
        subscription.unsubscribe();
      }
    };
  };
}
;
