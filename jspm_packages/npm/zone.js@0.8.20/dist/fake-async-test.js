/* */ 
"format cjs";
(function(process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() : typeof define === 'function' && define.amd ? define(factory) : (factory());
  }(this, (function() {
    'use strict';
    (function(global) {
      var Scheduler = (function() {
        function Scheduler() {
          this.nextId = 0;
          this._schedulerQueue = [];
          this._currentTime = 0;
        }
        Scheduler.prototype.scheduleFunction = function(cb, delay, args, isPeriodic, isRequestAnimationFrame, id) {
          if (args === void 0) {
            args = [];
          }
          if (isPeriodic === void 0) {
            isPeriodic = false;
          }
          if (isRequestAnimationFrame === void 0) {
            isRequestAnimationFrame = false;
          }
          if (id === void 0) {
            id = -1;
          }
          var currentId = id < 0 ? this.nextId++ : id;
          var endTime = this._currentTime + delay;
          var newEntry = {
            endTime: endTime,
            id: currentId,
            func: cb,
            args: args,
            delay: delay,
            isPeriodic: isPeriodic,
            isRequestAnimationFrame: isRequestAnimationFrame
          };
          var i = 0;
          for (; i < this._schedulerQueue.length; i++) {
            var currentEntry = this._schedulerQueue[i];
            if (newEntry.endTime < currentEntry.endTime) {
              break;
            }
          }
          this._schedulerQueue.splice(i, 0, newEntry);
          return currentId;
        };
        Scheduler.prototype.removeScheduledFunctionWithId = function(id) {
          for (var i = 0; i < this._schedulerQueue.length; i++) {
            if (this._schedulerQueue[i].id == id) {
              this._schedulerQueue.splice(i, 1);
              break;
            }
          }
        };
        Scheduler.prototype.tick = function(millis, doTick) {
          if (millis === void 0) {
            millis = 0;
          }
          var finalTime = this._currentTime + millis;
          var lastCurrentTime = 0;
          if (this._schedulerQueue.length === 0 && doTick) {
            doTick(millis);
            return;
          }
          while (this._schedulerQueue.length > 0) {
            var current = this._schedulerQueue[0];
            if (finalTime < current.endTime) {
              break;
            } else {
              var current_1 = this._schedulerQueue.shift();
              lastCurrentTime = this._currentTime;
              this._currentTime = current_1.endTime;
              if (doTick) {
                doTick(this._currentTime - lastCurrentTime);
              }
              var retval = current_1.func.apply(global, current_1.args);
              if (!retval) {
                break;
              }
            }
          }
          this._currentTime = finalTime;
        };
        Scheduler.prototype.flush = function(limit, flushPeriodic, doTick) {
          if (limit === void 0) {
            limit = 20;
          }
          if (flushPeriodic === void 0) {
            flushPeriodic = false;
          }
          if (flushPeriodic) {
            return this.flushPeriodic(doTick);
          } else {
            return this.flushNonPeriodic(limit, doTick);
          }
        };
        Scheduler.prototype.flushPeriodic = function(doTick) {
          if (this._schedulerQueue.length === 0) {
            return 0;
          }
          var startTime = this._currentTime;
          var lastTask = this._schedulerQueue[this._schedulerQueue.length - 1];
          this.tick(lastTask.endTime - startTime, doTick);
          return this._currentTime - startTime;
        };
        Scheduler.prototype.flushNonPeriodic = function(limit, doTick) {
          var startTime = this._currentTime;
          var lastCurrentTime = 0;
          var count = 0;
          while (this._schedulerQueue.length > 0) {
            count++;
            if (count > limit) {
              throw new Error('flush failed after reaching the limit of ' + limit + ' tasks. Does your code use a polling timeout?');
            }
            if (this._schedulerQueue.filter(function(task) {
              return !task.isPeriodic && !task.isRequestAnimationFrame;
            }).length === 0) {
              break;
            }
            var current = this._schedulerQueue.shift();
            lastCurrentTime = this._currentTime;
            this._currentTime = current.endTime;
            if (doTick) {
              doTick(this._currentTime - lastCurrentTime);
            }
            var retval = current.func.apply(global, current.args);
            if (!retval) {
              break;
            }
          }
          return this._currentTime - startTime;
        };
        return Scheduler;
      }());
      var FakeAsyncTestZoneSpec = (function() {
        function FakeAsyncTestZoneSpec(namePrefix, trackPendingRequestAnimationFrame, macroTaskOptions) {
          if (trackPendingRequestAnimationFrame === void 0) {
            trackPendingRequestAnimationFrame = false;
          }
          this.trackPendingRequestAnimationFrame = trackPendingRequestAnimationFrame;
          this.macroTaskOptions = macroTaskOptions;
          this._scheduler = new Scheduler();
          this._microtasks = [];
          this._lastError = null;
          this._uncaughtPromiseErrors = Promise[Zone.__symbol__('uncaughtPromiseErrors')];
          this.pendingPeriodicTimers = [];
          this.pendingTimers = [];
          this.properties = {'FakeAsyncTestZoneSpec': this};
          this.name = 'fakeAsyncTestZone for ' + namePrefix;
          if (!this.macroTaskOptions) {
            this.macroTaskOptions = global[Zone.__symbol__('FakeAsyncTestMacroTask')];
          }
        }
        FakeAsyncTestZoneSpec.assertInZone = function() {
          if (Zone.current.get('FakeAsyncTestZoneSpec') == null) {
            throw new Error('The code should be running in the fakeAsync zone to call this function');
          }
        };
        FakeAsyncTestZoneSpec.prototype._fnAndFlush = function(fn, completers) {
          var _this = this;
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            fn.apply(global, args);
            if (_this._lastError === null) {
              if (completers.onSuccess != null) {
                completers.onSuccess.apply(global);
              }
              _this.flushMicrotasks();
            } else {
              if (completers.onError != null) {
                completers.onError.apply(global);
              }
            }
            return _this._lastError === null;
          };
        };
        FakeAsyncTestZoneSpec._removeTimer = function(timers, id) {
          var index = timers.indexOf(id);
          if (index > -1) {
            timers.splice(index, 1);
          }
        };
        FakeAsyncTestZoneSpec.prototype._dequeueTimer = function(id) {
          var _this = this;
          return function() {
            FakeAsyncTestZoneSpec._removeTimer(_this.pendingTimers, id);
          };
        };
        FakeAsyncTestZoneSpec.prototype._requeuePeriodicTimer = function(fn, interval, args, id) {
          var _this = this;
          return function() {
            if (_this.pendingPeriodicTimers.indexOf(id) !== -1) {
              _this._scheduler.scheduleFunction(fn, interval, args, true, false, id);
            }
          };
        };
        FakeAsyncTestZoneSpec.prototype._dequeuePeriodicTimer = function(id) {
          var _this = this;
          return function() {
            FakeAsyncTestZoneSpec._removeTimer(_this.pendingPeriodicTimers, id);
          };
        };
        FakeAsyncTestZoneSpec.prototype._setTimeout = function(fn, delay, args, isTimer) {
          if (isTimer === void 0) {
            isTimer = true;
          }
          var removeTimerFn = this._dequeueTimer(this._scheduler.nextId);
          var cb = this._fnAndFlush(fn, {
            onSuccess: removeTimerFn,
            onError: removeTimerFn
          });
          var id = this._scheduler.scheduleFunction(cb, delay, args, false, !isTimer);
          if (isTimer) {
            this.pendingTimers.push(id);
          }
          return id;
        };
        FakeAsyncTestZoneSpec.prototype._clearTimeout = function(id) {
          FakeAsyncTestZoneSpec._removeTimer(this.pendingTimers, id);
          this._scheduler.removeScheduledFunctionWithId(id);
        };
        FakeAsyncTestZoneSpec.prototype._setInterval = function(fn, interval) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
          }
          var id = this._scheduler.nextId;
          var completers = {
            onSuccess: null,
            onError: this._dequeuePeriodicTimer(id)
          };
          var cb = this._fnAndFlush(fn, completers);
          completers.onSuccess = this._requeuePeriodicTimer(cb, interval, args, id);
          this._scheduler.scheduleFunction(cb, interval, args, true);
          this.pendingPeriodicTimers.push(id);
          return id;
        };
        FakeAsyncTestZoneSpec.prototype._clearInterval = function(id) {
          FakeAsyncTestZoneSpec._removeTimer(this.pendingPeriodicTimers, id);
          this._scheduler.removeScheduledFunctionWithId(id);
        };
        FakeAsyncTestZoneSpec.prototype._resetLastErrorAndThrow = function() {
          var error = this._lastError || this._uncaughtPromiseErrors[0];
          this._uncaughtPromiseErrors.length = 0;
          this._lastError = null;
          throw error;
        };
        FakeAsyncTestZoneSpec.prototype.tick = function(millis, doTick) {
          if (millis === void 0) {
            millis = 0;
          }
          FakeAsyncTestZoneSpec.assertInZone();
          this.flushMicrotasks();
          this._scheduler.tick(millis, doTick);
          if (this._lastError !== null) {
            this._resetLastErrorAndThrow();
          }
        };
        FakeAsyncTestZoneSpec.prototype.flushMicrotasks = function() {
          var _this = this;
          FakeAsyncTestZoneSpec.assertInZone();
          var flushErrors = function() {
            if (_this._lastError !== null || _this._uncaughtPromiseErrors.length) {
              _this._resetLastErrorAndThrow();
            }
          };
          while (this._microtasks.length > 0) {
            var microtask = this._microtasks.shift();
            microtask.func.apply(microtask.target, microtask.args);
          }
          flushErrors();
        };
        FakeAsyncTestZoneSpec.prototype.flush = function(limit, flushPeriodic, doTick) {
          FakeAsyncTestZoneSpec.assertInZone();
          this.flushMicrotasks();
          var elapsed = this._scheduler.flush(limit, flushPeriodic, doTick);
          if (this._lastError !== null) {
            this._resetLastErrorAndThrow();
          }
          return elapsed;
        };
        FakeAsyncTestZoneSpec.prototype.onScheduleTask = function(delegate, current, target, task) {
          switch (task.type) {
            case 'microTask':
              var args = task.data && task.data.args;
              var additionalArgs = void 0;
              if (args) {
                var callbackIndex = task.data.cbIdx;
                if (typeof args.length === 'number' && args.length > callbackIndex + 1) {
                  additionalArgs = Array.prototype.slice.call(args, callbackIndex + 1);
                }
              }
              this._microtasks.push({
                func: task.invoke,
                args: additionalArgs,
                target: task.data && task.data.target
              });
              break;
            case 'macroTask':
              switch (task.source) {
                case 'setTimeout':
                  task.data['handleId'] = this._setTimeout(task.invoke, task.data['delay'], task.data['args']);
                  break;
                case 'setInterval':
                  task.data['handleId'] = this._setInterval(task.invoke, task.data['delay'], task.data['args']);
                  break;
                case 'XMLHttpRequest.send':
                  throw new Error('Cannot make XHRs from within a fake async test. Request URL: ' + task.data['url']);
                case 'requestAnimationFrame':
                case 'webkitRequestAnimationFrame':
                case 'mozRequestAnimationFrame':
                  task.data['handleId'] = this._setTimeout(task.invoke, 16, task.data['args'], this.trackPendingRequestAnimationFrame);
                  break;
                default:
                  var macroTaskOption = this.findMacroTaskOption(task);
                  if (macroTaskOption) {
                    var args_1 = task.data && task.data['args'];
                    var delay = args_1 && args_1.length > 1 ? args_1[1] : 0;
                    var callbackArgs = macroTaskOption.callbackArgs ? macroTaskOption.callbackArgs : args_1;
                    if (!!macroTaskOption.isPeriodic) {
                      task.data['handleId'] = this._setInterval(task.invoke, delay, callbackArgs);
                      task.data.isPeriodic = true;
                    } else {
                      task.data['handleId'] = this._setTimeout(task.invoke, delay, callbackArgs);
                    }
                    break;
                  }
                  throw new Error('Unknown macroTask scheduled in fake async test: ' + task.source);
              }
              break;
            case 'eventTask':
              task = delegate.scheduleTask(target, task);
              break;
          }
          return task;
        };
        FakeAsyncTestZoneSpec.prototype.onCancelTask = function(delegate, current, target, task) {
          switch (task.source) {
            case 'setTimeout':
            case 'requestAnimationFrame':
            case 'webkitRequestAnimationFrame':
            case 'mozRequestAnimationFrame':
              return this._clearTimeout(task.data['handleId']);
            case 'setInterval':
              return this._clearInterval(task.data['handleId']);
            default:
              var macroTaskOption = this.findMacroTaskOption(task);
              if (macroTaskOption) {
                var handleId = task.data['handleId'];
                return macroTaskOption.isPeriodic ? this._clearInterval(handleId) : this._clearTimeout(handleId);
              }
              return delegate.cancelTask(target, task);
          }
        };
        FakeAsyncTestZoneSpec.prototype.findMacroTaskOption = function(task) {
          if (!this.macroTaskOptions) {
            return null;
          }
          for (var i = 0; i < this.macroTaskOptions.length; i++) {
            var macroTaskOption = this.macroTaskOptions[i];
            if (macroTaskOption.source === task.source) {
              return macroTaskOption;
            }
          }
          return null;
        };
        FakeAsyncTestZoneSpec.prototype.onHandleError = function(parentZoneDelegate, currentZone, targetZone, error) {
          this._lastError = error;
          return false;
        };
        return FakeAsyncTestZoneSpec;
      }());
      Zone['FakeAsyncTestZoneSpec'] = FakeAsyncTestZoneSpec;
    })(typeof window === 'object' && window || typeof self === 'object' && self || global);
  })));
})(require('process'));
