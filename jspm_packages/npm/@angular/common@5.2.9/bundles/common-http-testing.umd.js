/* */ 
"format cjs";
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./common-http.umd'), require('@angular/core'), require('rxjs/Observable')) : typeof define === 'function' && define.amd ? define('@angular/common/http/testing', ['exports', '@angular/common/http', '@angular/core', 'rxjs/Observable'], factory) : (factory((global.ng = global.ng || {}, global.ng.common = global.ng.common || {}, global.ng.common.http = global.ng.common.http || {}, global.ng.common.http.testing = {}), global.ng.common.http, global.ng.core, global.Rx));
}(this, (function(exports, _angular_common_http, _angular_core, rxjs_Observable) {
  'use strict';
  var HttpTestingController = (function() {
    function HttpTestingController() {}
    return HttpTestingController;
  }());
  var TestRequest = (function() {
    function TestRequest(request, observer) {
      this.request = request;
      this.observer = observer;
      this._cancelled = false;
    }
    Object.defineProperty(TestRequest.prototype, "cancelled", {
      get: function() {
        return this._cancelled;
      },
      enumerable: true,
      configurable: true
    });
    TestRequest.prototype.flush = function(body, opts) {
      if (opts === void 0) {
        opts = {};
      }
      if (this.cancelled) {
        throw new Error("Cannot flush a cancelled request.");
      }
      var url = this.request.urlWithParams;
      var headers = (opts.headers instanceof _angular_common_http.HttpHeaders) ? opts.headers : new _angular_common_http.HttpHeaders(opts.headers);
      body = _maybeConvertBody(this.request.responseType, body);
      var statusText = opts.statusText;
      var status = opts.status !== undefined ? opts.status : 200;
      if (opts.status === undefined) {
        if (body === null) {
          status = 204;
          statusText = statusText || 'No Content';
        } else {
          statusText = statusText || 'OK';
        }
      }
      if (statusText === undefined) {
        throw new Error('statusText is required when setting a custom status.');
      }
      if (status >= 200 && status < 300) {
        this.observer.next(new _angular_common_http.HttpResponse({
          body: body,
          headers: headers,
          status: status,
          statusText: statusText,
          url: url
        }));
        this.observer.complete();
      } else {
        this.observer.error(new _angular_common_http.HttpErrorResponse({
          error: body,
          headers: headers,
          status: status,
          statusText: statusText,
          url: url
        }));
      }
    };
    TestRequest.prototype.error = function(error, opts) {
      if (opts === void 0) {
        opts = {};
      }
      if (this.cancelled) {
        throw new Error("Cannot return an error for a cancelled request.");
      }
      if (opts.status && opts.status >= 200 && opts.status < 300) {
        throw new Error("error() called with a successful status.");
      }
      var headers = (opts.headers instanceof _angular_common_http.HttpHeaders) ? opts.headers : new _angular_common_http.HttpHeaders(opts.headers);
      this.observer.error(new _angular_common_http.HttpErrorResponse({
        error: error,
        headers: headers,
        status: opts.status || 0,
        statusText: opts.statusText || '',
        url: this.request.urlWithParams
      }));
    };
    TestRequest.prototype.event = function(event) {
      if (this.cancelled) {
        throw new Error("Cannot send events to a cancelled request.");
      }
      this.observer.next(event);
    };
    return TestRequest;
  }());
  function _toArrayBufferBody(body) {
    if (typeof ArrayBuffer === 'undefined') {
      throw new Error('ArrayBuffer responses are not supported on this platform.');
    }
    if (body instanceof ArrayBuffer) {
      return body;
    }
    throw new Error('Automatic conversion to ArrayBuffer is not supported for response type.');
  }
  function _toBlob(body) {
    if (typeof Blob === 'undefined') {
      throw new Error('Blob responses are not supported on this platform.');
    }
    if (body instanceof Blob) {
      return body;
    }
    if (ArrayBuffer && body instanceof ArrayBuffer) {
      return new Blob([body]);
    }
    throw new Error('Automatic conversion to Blob is not supported for response type.');
  }
  function _toJsonBody(body, format) {
    if (format === void 0) {
      format = 'JSON';
    }
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
      throw new Error("Automatic conversion to " + format + " is not supported for ArrayBuffers.");
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
      throw new Error("Automatic conversion to " + format + " is not supported for Blobs.");
    }
    if (typeof body === 'string' || typeof body === 'number' || typeof body === 'object' || Array.isArray(body)) {
      return body;
    }
    throw new Error("Automatic conversion to " + format + " is not supported for response type.");
  }
  function _toTextBody(body) {
    if (typeof body === 'string') {
      return body;
    }
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
      throw new Error('Automatic conversion to text is not supported for ArrayBuffers.');
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
      throw new Error('Automatic conversion to text is not supported for Blobs.');
    }
    return JSON.stringify(_toJsonBody(body, 'text'));
  }
  function _maybeConvertBody(responseType, body) {
    if (body === null) {
      return null;
    }
    switch (responseType) {
      case 'arraybuffer':
        return _toArrayBufferBody(body);
      case 'blob':
        return _toBlob(body);
      case 'json':
        return _toJsonBody(body);
      case 'text':
        return _toTextBody(body);
      default:
        throw new Error("Unsupported responseType: " + responseType);
    }
  }
  var HttpClientTestingBackend = (function() {
    function HttpClientTestingBackend() {
      this.open = [];
    }
    HttpClientTestingBackend.prototype.handle = function(req) {
      var _this = this;
      return new rxjs_Observable.Observable(function(observer) {
        var testReq = new TestRequest(req, observer);
        _this.open.push(testReq);
        observer.next(({type: _angular_common_http.HttpEventType.Sent}));
        return function() {
          testReq._cancelled = true;
        };
      });
    };
    HttpClientTestingBackend.prototype._match = function(match) {
      if (typeof match === 'string') {
        return this.open.filter(function(testReq) {
          return testReq.request.urlWithParams === match;
        });
      } else if (typeof match === 'function') {
        return this.open.filter(function(testReq) {
          return match(testReq.request);
        });
      } else {
        return this.open.filter(function(testReq) {
          return (!match.method || testReq.request.method === match.method.toUpperCase()) && (!match.url || testReq.request.urlWithParams === match.url);
        });
      }
    };
    HttpClientTestingBackend.prototype.match = function(match) {
      var _this = this;
      var results = this._match(match);
      results.forEach(function(result) {
        var index = _this.open.indexOf(result);
        if (index !== -1) {
          _this.open.splice(index, 1);
        }
      });
      return results;
    };
    HttpClientTestingBackend.prototype.expectOne = function(match, description) {
      description = description || this.descriptionFromMatcher(match);
      var matches = this.match(match);
      if (matches.length > 1) {
        throw new Error("Expected one matching request for criteria \"" + description + "\", found " + matches.length + " requests.");
      }
      if (matches.length === 0) {
        throw new Error("Expected one matching request for criteria \"" + description + "\", found none.");
      }
      return matches[0];
    };
    HttpClientTestingBackend.prototype.expectNone = function(match, description) {
      description = description || this.descriptionFromMatcher(match);
      var matches = this.match(match);
      if (matches.length > 0) {
        throw new Error("Expected zero matching requests for criteria \"" + description + "\", found " + matches.length + ".");
      }
    };
    HttpClientTestingBackend.prototype.verify = function(opts) {
      if (opts === void 0) {
        opts = {};
      }
      var open = this.open;
      if (opts.ignoreCancelled) {
        open = open.filter(function(testReq) {
          return !testReq.cancelled;
        });
      }
      if (open.length > 0) {
        var requests = open.map(function(testReq) {
          var url = testReq.request.urlWithParams.split('?')[0];
          var method = testReq.request.method;
          return method + " " + url;
        }).join(', ');
        throw new Error("Expected no open requests, found " + open.length + ": " + requests);
      }
    };
    HttpClientTestingBackend.prototype.descriptionFromMatcher = function(matcher) {
      if (typeof matcher === 'string') {
        return "Match URL: " + matcher;
      } else if (typeof matcher === 'object') {
        var method = matcher.method || '(any)';
        var url = matcher.url || '(any)';
        return "Match method: " + method + ", URL: " + url;
      } else {
        return "Match by function: " + matcher.name;
      }
    };
    HttpClientTestingBackend.decorators = [{type: _angular_core.Injectable}];
    HttpClientTestingBackend.ctorParameters = function() {
      return [];
    };
    return HttpClientTestingBackend;
  }());
  var HttpClientTestingModule = (function() {
    function HttpClientTestingModule() {}
    HttpClientTestingModule.decorators = [{
      type: _angular_core.NgModule,
      args: [{
        imports: [_angular_common_http.HttpClientModule],
        providers: [HttpClientTestingBackend, {
          provide: _angular_common_http.HttpBackend,
          useExisting: HttpClientTestingBackend
        }, {
          provide: HttpTestingController,
          useExisting: HttpClientTestingBackend
        }]
      }]
    }];
    HttpClientTestingModule.ctorParameters = function() {
      return [];
    };
    return HttpClientTestingModule;
  }());
  exports.HttpTestingController = HttpTestingController;
  exports.HttpClientTestingModule = HttpClientTestingModule;
  exports.TestRequest = TestRequest;
  exports.ɵa = HttpClientTestingBackend;
  Object.defineProperty(exports, '__esModule', {value: true});
})));
