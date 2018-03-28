/* */ 
"format cjs";
(function(process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core')) : typeof define === 'function' && define.amd ? define('@angular/platform-browser', ['exports', '@angular/common', '@angular/core'], factory) : (factory((global.ng = global.ng || {}, global.ng.platformBrowser = {}), global.ng.common, global.ng.core));
  }(this, (function(exports, _angular_common, _angular_core) {
    'use strict';
    var extendStatics = Object.setPrototypeOf || ({__proto__: []} instanceof Array && function(d, b) {
      d.__proto__ = b;
    }) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
    };
    function __extends(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = Object.assign || function __assign(t) {
      for (var s,
          i = 1,
          n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    var _DOM = ((null));
    function getDOM() {
      return _DOM;
    }
    function setRootDomAdapter(adapter) {
      if (!_DOM) {
        _DOM = adapter;
      }
    }
    var DomAdapter = (function() {
      function DomAdapter() {
        this.resourceLoaderType = ((null));
      }
      Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
        get: function() {
          return this._attrToPropMap;
        },
        set: function(value) {
          this._attrToPropMap = value;
        },
        enumerable: true,
        configurable: true
      });
      return DomAdapter;
    }());
    var GenericBrowserDomAdapter = (function(_super) {
      __extends(GenericBrowserDomAdapter, _super);
      function GenericBrowserDomAdapter() {
        var _this = _super.call(this) || this;
        _this._animationPrefix = null;
        _this._transitionEnd = null;
        try {
          var element_1 = _this.createElement('div', document);
          if (_this.getStyle(element_1, 'animationName') != null) {
            _this._animationPrefix = '';
          } else {
            var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
            for (var i = 0; i < domPrefixes.length; i++) {
              if (_this.getStyle(element_1, domPrefixes[i] + 'AnimationName') != null) {
                _this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                break;
              }
            }
          }
          var transEndEventNames_1 = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
          };
          Object.keys(transEndEventNames_1).forEach(function(key) {
            if (_this.getStyle(element_1, key) != null) {
              _this._transitionEnd = transEndEventNames_1[key];
            }
          });
        } catch (e) {
          _this._animationPrefix = null;
          _this._transitionEnd = null;
        }
        return _this;
      }
      GenericBrowserDomAdapter.prototype.getDistributedNodes = function(el) {
        return ((el)).getDistributedNodes();
      };
      GenericBrowserDomAdapter.prototype.resolveAndSetHref = function(el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
      };
      GenericBrowserDomAdapter.prototype.supportsDOMEvents = function() {
        return true;
      };
      GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function() {
        return typeof((document.body)).createShadowRoot === 'function';
      };
      GenericBrowserDomAdapter.prototype.getAnimationPrefix = function() {
        return this._animationPrefix ? this._animationPrefix : '';
      };
      GenericBrowserDomAdapter.prototype.getTransitionEnd = function() {
        return this._transitionEnd ? this._transitionEnd : '';
      };
      GenericBrowserDomAdapter.prototype.supportsAnimation = function() {
        return this._animationPrefix != null && this._transitionEnd != null;
      };
      return GenericBrowserDomAdapter;
    }(DomAdapter));
    var _attrToPropMap = {
      'class': 'className',
      'innerHtml': 'innerHTML',
      'readonly': 'readOnly',
      'tabindex': 'tabIndex'
    };
    var DOM_KEY_LOCATION_NUMPAD = 3;
    var _keyMap = {
      '\b': 'Backspace',
      '\t': 'Tab',
      '\x7F': 'Delete',
      '\x1B': 'Escape',
      'Del': 'Delete',
      'Esc': 'Escape',
      'Left': 'ArrowLeft',
      'Right': 'ArrowRight',
      'Up': 'ArrowUp',
      'Down': 'ArrowDown',
      'Menu': 'ContextMenu',
      'Scroll': 'ScrollLock',
      'Win': 'OS'
    };
    var _chromeNumKeyPadMap = {
      'A': '1',
      'B': '2',
      'C': '3',
      'D': '4',
      'E': '5',
      'F': '6',
      'G': '7',
      'H': '8',
      'I': '9',
      'J': '*',
      'K': '+',
      'M': '-',
      'N': '.',
      'O': '/',
      '\x60': '0',
      '\x90': 'NumLock'
    };
    var nodeContains;
    if (_angular_core.ɵglobal['Node']) {
      nodeContains = _angular_core.ɵglobal['Node'].prototype.contains || function(node) {
        return !!(this.compareDocumentPosition(node) & 16);
      };
    }
    var BrowserDomAdapter = (function(_super) {
      __extends(BrowserDomAdapter, _super);
      function BrowserDomAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      BrowserDomAdapter.prototype.parse = function(templateHtml) {
        throw new Error('parse not implemented');
      };
      BrowserDomAdapter.makeCurrent = function() {
        setRootDomAdapter(new BrowserDomAdapter());
      };
      BrowserDomAdapter.prototype.hasProperty = function(element, name) {
        return name in element;
      };
      BrowserDomAdapter.prototype.setProperty = function(el, name, value) {
        ((el))[name] = value;
      };
      BrowserDomAdapter.prototype.getProperty = function(el, name) {
        return ((el))[name];
      };
      BrowserDomAdapter.prototype.invoke = function(el, methodName, args) {
        (_a = ((el)))[methodName].apply(_a, args);
        var _a;
      };
      BrowserDomAdapter.prototype.logError = function(error) {
        if (window.console) {
          if (console.error) {
            console.error(error);
          } else {
            console.log(error);
          }
        }
      };
      BrowserDomAdapter.prototype.log = function(error) {
        if (window.console) {
          window.console.log && window.console.log(error);
        }
      };
      BrowserDomAdapter.prototype.logGroup = function(error) {
        if (window.console) {
          window.console.group && window.console.group(error);
        }
      };
      BrowserDomAdapter.prototype.logGroupEnd = function() {
        if (window.console) {
          window.console.groupEnd && window.console.groupEnd();
        }
      };
      Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
        get: function() {
          return _attrToPropMap;
        },
        enumerable: true,
        configurable: true
      });
      BrowserDomAdapter.prototype.contains = function(nodeA, nodeB) {
        return nodeContains.call(nodeA, nodeB);
      };
      BrowserDomAdapter.prototype.querySelector = function(el, selector) {
        return el.querySelector(selector);
      };
      BrowserDomAdapter.prototype.querySelectorAll = function(el, selector) {
        return el.querySelectorAll(selector);
      };
      BrowserDomAdapter.prototype.on = function(el, evt, listener) {
        el.addEventListener(evt, listener, false);
      };
      BrowserDomAdapter.prototype.onAndCancel = function(el, evt, listener) {
        el.addEventListener(evt, listener, false);
        return function() {
          el.removeEventListener(evt, listener, false);
        };
      };
      BrowserDomAdapter.prototype.dispatchEvent = function(el, evt) {
        el.dispatchEvent(evt);
      };
      BrowserDomAdapter.prototype.createMouseEvent = function(eventType) {
        var evt = this.getDefaultDocument().createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
      };
      BrowserDomAdapter.prototype.createEvent = function(eventType) {
        var evt = this.getDefaultDocument().createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
      };
      BrowserDomAdapter.prototype.preventDefault = function(evt) {
        evt.preventDefault();
        evt.returnValue = false;
      };
      BrowserDomAdapter.prototype.isPrevented = function(evt) {
        return evt.defaultPrevented || evt.returnValue != null && !evt.returnValue;
      };
      BrowserDomAdapter.prototype.getInnerHTML = function(el) {
        return el.innerHTML;
      };
      BrowserDomAdapter.prototype.getTemplateContent = function(el) {
        return 'content' in el && this.isTemplateElement(el) ? ((el)).content : null;
      };
      BrowserDomAdapter.prototype.getOuterHTML = function(el) {
        return el.outerHTML;
      };
      BrowserDomAdapter.prototype.nodeName = function(node) {
        return node.nodeName;
      };
      BrowserDomAdapter.prototype.nodeValue = function(node) {
        return node.nodeValue;
      };
      BrowserDomAdapter.prototype.type = function(node) {
        return node.type;
      };
      BrowserDomAdapter.prototype.content = function(node) {
        if (this.hasProperty(node, 'content')) {
          return ((node)).content;
        } else {
          return node;
        }
      };
      BrowserDomAdapter.prototype.firstChild = function(el) {
        return el.firstChild;
      };
      BrowserDomAdapter.prototype.nextSibling = function(el) {
        return el.nextSibling;
      };
      BrowserDomAdapter.prototype.parentElement = function(el) {
        return el.parentNode;
      };
      BrowserDomAdapter.prototype.childNodes = function(el) {
        return el.childNodes;
      };
      BrowserDomAdapter.prototype.childNodesAsList = function(el) {
        var childNodes = el.childNodes;
        var res = new Array(childNodes.length);
        for (var i = 0; i < childNodes.length; i++) {
          res[i] = childNodes[i];
        }
        return res;
      };
      BrowserDomAdapter.prototype.clearNodes = function(el) {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
      };
      BrowserDomAdapter.prototype.appendChild = function(el, node) {
        el.appendChild(node);
      };
      BrowserDomAdapter.prototype.removeChild = function(el, node) {
        el.removeChild(node);
      };
      BrowserDomAdapter.prototype.replaceChild = function(el, newChild, oldChild) {
        el.replaceChild(newChild, oldChild);
      };
      BrowserDomAdapter.prototype.remove = function(node) {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
        return node;
      };
      BrowserDomAdapter.prototype.insertBefore = function(parent, ref, node) {
        parent.insertBefore(node, ref);
      };
      BrowserDomAdapter.prototype.insertAllBefore = function(parent, ref, nodes) {
        nodes.forEach(function(n) {
          return parent.insertBefore(n, ref);
        });
      };
      BrowserDomAdapter.prototype.insertAfter = function(parent, ref, node) {
        parent.insertBefore(node, ref.nextSibling);
      };
      BrowserDomAdapter.prototype.setInnerHTML = function(el, value) {
        el.innerHTML = value;
      };
      BrowserDomAdapter.prototype.getText = function(el) {
        return el.textContent;
      };
      BrowserDomAdapter.prototype.setText = function(el, value) {
        el.textContent = value;
      };
      BrowserDomAdapter.prototype.getValue = function(el) {
        return el.value;
      };
      BrowserDomAdapter.prototype.setValue = function(el, value) {
        el.value = value;
      };
      BrowserDomAdapter.prototype.getChecked = function(el) {
        return el.checked;
      };
      BrowserDomAdapter.prototype.setChecked = function(el, value) {
        el.checked = value;
      };
      BrowserDomAdapter.prototype.createComment = function(text) {
        return this.getDefaultDocument().createComment(text);
      };
      BrowserDomAdapter.prototype.createTemplate = function(html) {
        var t = this.getDefaultDocument().createElement('template');
        t.innerHTML = html;
        return t;
      };
      BrowserDomAdapter.prototype.createElement = function(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
      };
      BrowserDomAdapter.prototype.createElementNS = function(ns, tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElementNS(ns, tagName);
      };
      BrowserDomAdapter.prototype.createTextNode = function(text, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createTextNode(text);
      };
      BrowserDomAdapter.prototype.createScriptTag = function(attrName, attrValue, doc) {
        doc = doc || this.getDefaultDocument();
        var el = (doc.createElement('SCRIPT'));
        el.setAttribute(attrName, attrValue);
        return el;
      };
      BrowserDomAdapter.prototype.createStyleElement = function(css, doc) {
        doc = doc || this.getDefaultDocument();
        var style = (doc.createElement('style'));
        this.appendChild(style, this.createTextNode(css, doc));
        return style;
      };
      BrowserDomAdapter.prototype.createShadowRoot = function(el) {
        return ((el)).createShadowRoot();
      };
      BrowserDomAdapter.prototype.getShadowRoot = function(el) {
        return ((el)).shadowRoot;
      };
      BrowserDomAdapter.prototype.getHost = function(el) {
        return ((el)).host;
      };
      BrowserDomAdapter.prototype.clone = function(node) {
        return node.cloneNode(true);
      };
      BrowserDomAdapter.prototype.getElementsByClassName = function(element, name) {
        return element.getElementsByClassName(name);
      };
      BrowserDomAdapter.prototype.getElementsByTagName = function(element, name) {
        return element.getElementsByTagName(name);
      };
      BrowserDomAdapter.prototype.classList = function(element) {
        return Array.prototype.slice.call(element.classList, 0);
      };
      BrowserDomAdapter.prototype.addClass = function(element, className) {
        element.classList.add(className);
      };
      BrowserDomAdapter.prototype.removeClass = function(element, className) {
        element.classList.remove(className);
      };
      BrowserDomAdapter.prototype.hasClass = function(element, className) {
        return element.classList.contains(className);
      };
      BrowserDomAdapter.prototype.setStyle = function(element, styleName, styleValue) {
        element.style[styleName] = styleValue;
      };
      BrowserDomAdapter.prototype.removeStyle = function(element, stylename) {
        element.style[stylename] = '';
      };
      BrowserDomAdapter.prototype.getStyle = function(element, stylename) {
        return element.style[stylename];
      };
      BrowserDomAdapter.prototype.hasStyle = function(element, styleName, styleValue) {
        var value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
      };
      BrowserDomAdapter.prototype.tagName = function(element) {
        return element.tagName;
      };
      BrowserDomAdapter.prototype.attributeMap = function(element) {
        var res = new Map();
        var elAttrs = element.attributes;
        for (var i = 0; i < elAttrs.length; i++) {
          var attrib = elAttrs.item(i);
          res.set(attrib.name, attrib.value);
        }
        return res;
      };
      BrowserDomAdapter.prototype.hasAttribute = function(element, attribute) {
        return element.hasAttribute(attribute);
      };
      BrowserDomAdapter.prototype.hasAttributeNS = function(element, ns, attribute) {
        return element.hasAttributeNS(ns, attribute);
      };
      BrowserDomAdapter.prototype.getAttribute = function(element, attribute) {
        return element.getAttribute(attribute);
      };
      BrowserDomAdapter.prototype.getAttributeNS = function(element, ns, name) {
        return element.getAttributeNS(ns, name);
      };
      BrowserDomAdapter.prototype.setAttribute = function(element, name, value) {
        element.setAttribute(name, value);
      };
      BrowserDomAdapter.prototype.setAttributeNS = function(element, ns, name, value) {
        element.setAttributeNS(ns, name, value);
      };
      BrowserDomAdapter.prototype.removeAttribute = function(element, attribute) {
        element.removeAttribute(attribute);
      };
      BrowserDomAdapter.prototype.removeAttributeNS = function(element, ns, name) {
        element.removeAttributeNS(ns, name);
      };
      BrowserDomAdapter.prototype.templateAwareRoot = function(el) {
        return this.isTemplateElement(el) ? this.content(el) : el;
      };
      BrowserDomAdapter.prototype.createHtmlDocument = function() {
        return document.implementation.createHTMLDocument('fakeTitle');
      };
      BrowserDomAdapter.prototype.getDefaultDocument = function() {
        return document;
      };
      BrowserDomAdapter.prototype.getBoundingClientRect = function(el) {
        try {
          return el.getBoundingClientRect();
        } catch (e) {
          return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
          };
        }
      };
      BrowserDomAdapter.prototype.getTitle = function(doc) {
        return doc.title;
      };
      BrowserDomAdapter.prototype.setTitle = function(doc, newTitle) {
        doc.title = newTitle || '';
      };
      BrowserDomAdapter.prototype.elementMatches = function(n, selector) {
        if (this.isElementNode(n)) {
          return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
        }
        return false;
      };
      BrowserDomAdapter.prototype.isTemplateElement = function(el) {
        return this.isElementNode(el) && el.nodeName === 'TEMPLATE';
      };
      BrowserDomAdapter.prototype.isTextNode = function(node) {
        return node.nodeType === Node.TEXT_NODE;
      };
      BrowserDomAdapter.prototype.isCommentNode = function(node) {
        return node.nodeType === Node.COMMENT_NODE;
      };
      BrowserDomAdapter.prototype.isElementNode = function(node) {
        return node.nodeType === Node.ELEMENT_NODE;
      };
      BrowserDomAdapter.prototype.hasShadowRoot = function(node) {
        return node.shadowRoot != null && node instanceof HTMLElement;
      };
      BrowserDomAdapter.prototype.isShadowRoot = function(node) {
        return node instanceof DocumentFragment;
      };
      BrowserDomAdapter.prototype.importIntoDoc = function(node) {
        return document.importNode(this.templateAwareRoot(node), true);
      };
      BrowserDomAdapter.prototype.adoptNode = function(node) {
        return document.adoptNode(node);
      };
      BrowserDomAdapter.prototype.getHref = function(el) {
        return ((el.getAttribute('href')));
      };
      BrowserDomAdapter.prototype.getEventKey = function(event) {
        var key = event.key;
        if (key == null) {
          key = event.keyIdentifier;
          if (key == null) {
            return 'Unidentified';
          }
          if (key.startsWith('U+')) {
            key = String.fromCharCode(parseInt(key.substring(2), 16));
            if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
              key = ((_chromeNumKeyPadMap))[key];
            }
          }
        }
        return _keyMap[key] || key;
      };
      BrowserDomAdapter.prototype.getGlobalEventTarget = function(doc, target) {
        if (target === 'window') {
          return window;
        }
        if (target === 'document') {
          return doc;
        }
        if (target === 'body') {
          return doc.body;
        }
        return null;
      };
      BrowserDomAdapter.prototype.getHistory = function() {
        return window.history;
      };
      BrowserDomAdapter.prototype.getLocation = function() {
        return window.location;
      };
      BrowserDomAdapter.prototype.getBaseHref = function(doc) {
        var href = getBaseElementHref();
        return href == null ? null : relativePath(href);
      };
      BrowserDomAdapter.prototype.resetBaseElement = function() {
        baseElement = null;
      };
      BrowserDomAdapter.prototype.getUserAgent = function() {
        return window.navigator.userAgent;
      };
      BrowserDomAdapter.prototype.setData = function(element, name, value) {
        this.setAttribute(element, 'data-' + name, value);
      };
      BrowserDomAdapter.prototype.getData = function(element, name) {
        return this.getAttribute(element, 'data-' + name);
      };
      BrowserDomAdapter.prototype.getComputedStyle = function(element) {
        return getComputedStyle(element);
      };
      BrowserDomAdapter.prototype.supportsWebAnimation = function() {
        return typeof((Element)).prototype['animate'] === 'function';
      };
      BrowserDomAdapter.prototype.performanceNow = function() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
      };
      BrowserDomAdapter.prototype.supportsCookies = function() {
        return true;
      };
      BrowserDomAdapter.prototype.getCookie = function(name) {
        return _angular_common.ɵparseCookieValue(document.cookie, name);
      };
      BrowserDomAdapter.prototype.setCookie = function(name, value) {
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
      };
      return BrowserDomAdapter;
    }(GenericBrowserDomAdapter));
    var baseElement = null;
    function getBaseElementHref() {
      if (!baseElement) {
        baseElement = ((document.querySelector('base')));
        if (!baseElement) {
          return null;
        }
      }
      return baseElement.getAttribute('href');
    }
    var urlParsingNode;
    function relativePath(url) {
      if (!urlParsingNode) {
        urlParsingNode = document.createElement('a');
      }
      urlParsingNode.setAttribute('href', url);
      return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname : '/' + urlParsingNode.pathname;
    }
    var DOCUMENT$1 = _angular_common.DOCUMENT;
    function supportsState() {
      return !!window.history.pushState;
    }
    var BrowserPlatformLocation = (function(_super) {
      __extends(BrowserPlatformLocation, _super);
      function BrowserPlatformLocation(_doc) {
        var _this = _super.call(this) || this;
        _this._doc = _doc;
        _this._init();
        return _this;
      }
      BrowserPlatformLocation.prototype._init = function() {
        ((this)).location = getDOM().getLocation();
        this._history = getDOM().getHistory();
      };
      BrowserPlatformLocation.prototype.getBaseHrefFromDOM = function() {
        return ((getDOM().getBaseHref(this._doc)));
      };
      BrowserPlatformLocation.prototype.onPopState = function(fn) {
        getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('popstate', fn, false);
      };
      BrowserPlatformLocation.prototype.onHashChange = function(fn) {
        getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('hashchange', fn, false);
      };
      Object.defineProperty(BrowserPlatformLocation.prototype, "pathname", {
        get: function() {
          return this.location.pathname;
        },
        set: function(newPath) {
          this.location.pathname = newPath;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BrowserPlatformLocation.prototype, "search", {
        get: function() {
          return this.location.search;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BrowserPlatformLocation.prototype, "hash", {
        get: function() {
          return this.location.hash;
        },
        enumerable: true,
        configurable: true
      });
      BrowserPlatformLocation.prototype.pushState = function(state, title, url) {
        if (supportsState()) {
          this._history.pushState(state, title, url);
        } else {
          this.location.hash = url;
        }
      };
      BrowserPlatformLocation.prototype.replaceState = function(state, title, url) {
        if (supportsState()) {
          this._history.replaceState(state, title, url);
        } else {
          this.location.hash = url;
        }
      };
      BrowserPlatformLocation.prototype.forward = function() {
        this._history.forward();
      };
      BrowserPlatformLocation.prototype.back = function() {
        this._history.back();
      };
      BrowserPlatformLocation.decorators = [{type: _angular_core.Injectable}];
      BrowserPlatformLocation.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [DOCUMENT$1]
          }]
        }];
      };
      return BrowserPlatformLocation;
    }(_angular_common.PlatformLocation));
    var Meta = (function() {
      function Meta(_doc) {
        this._doc = _doc;
        this._dom = getDOM();
      }
      Meta.prototype.addTag = function(tag, forceCreation) {
        if (forceCreation === void 0) {
          forceCreation = false;
        }
        if (!tag)
          return null;
        return this._getOrCreateElement(tag, forceCreation);
      };
      Meta.prototype.addTags = function(tags, forceCreation) {
        var _this = this;
        if (forceCreation === void 0) {
          forceCreation = false;
        }
        if (!tags)
          return [];
        return tags.reduce(function(result, tag) {
          if (tag) {
            result.push(_this._getOrCreateElement(tag, forceCreation));
          }
          return result;
        }, []);
      };
      Meta.prototype.getTag = function(attrSelector) {
        if (!attrSelector)
          return null;
        return this._dom.querySelector(this._doc, "meta[" + attrSelector + "]") || null;
      };
      Meta.prototype.getTags = function(attrSelector) {
        if (!attrSelector)
          return [];
        var list = this._dom.querySelectorAll(this._doc, "meta[" + attrSelector + "]");
        return list ? [].slice.call(list) : [];
      };
      Meta.prototype.updateTag = function(tag, selector) {
        if (!tag)
          return null;
        selector = selector || this._parseSelector(tag);
        var meta = ((this.getTag(selector)));
        if (meta) {
          return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
      };
      Meta.prototype.removeTag = function(attrSelector) {
        this.removeTagElement(((this.getTag(attrSelector))));
      };
      Meta.prototype.removeTagElement = function(meta) {
        if (meta) {
          this._dom.remove(meta);
        }
      };
      Meta.prototype._getOrCreateElement = function(meta, forceCreation) {
        if (forceCreation === void 0) {
          forceCreation = false;
        }
        if (!forceCreation) {
          var selector = this._parseSelector(meta);
          var elem = ((this.getTag(selector)));
          if (elem && this._containsAttributes(meta, elem))
            return elem;
        }
        var element = (this._dom.createElement('meta'));
        this._setMetaElementAttributes(meta, element);
        var head = this._dom.getElementsByTagName(this._doc, 'head')[0];
        this._dom.appendChild(head, element);
        return element;
      };
      Meta.prototype._setMetaElementAttributes = function(tag, el) {
        var _this = this;
        Object.keys(tag).forEach(function(prop) {
          return _this._dom.setAttribute(el, prop, tag[prop]);
        });
        return el;
      };
      Meta.prototype._parseSelector = function(tag) {
        var attr = tag.name ? 'name' : 'property';
        return attr + "=\"" + tag[attr] + "\"";
      };
      Meta.prototype._containsAttributes = function(tag, elem) {
        var _this = this;
        return Object.keys(tag).every(function(key) {
          return _this._dom.getAttribute(elem, key) === tag[key];
        });
      };
      Meta.decorators = [{type: _angular_core.Injectable}];
      Meta.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [DOCUMENT$1]
          }]
        }];
      };
      return Meta;
    }());
    var TRANSITION_ID = new _angular_core.InjectionToken('TRANSITION_ID');
    function appInitializerFactory(transitionId, document, injector) {
      return function() {
        injector.get(_angular_core.ApplicationInitStatus).donePromise.then(function() {
          var dom = getDOM();
          var styles = Array.prototype.slice.apply(dom.querySelectorAll(document, "style[ng-transition]"));
          styles.filter(function(el) {
            return dom.getAttribute(el, 'ng-transition') === transitionId;
          }).forEach(function(el) {
            return dom.remove(el);
          });
        });
      };
    }
    var SERVER_TRANSITION_PROVIDERS = [{
      provide: _angular_core.APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TRANSITION_ID, DOCUMENT$1, _angular_core.Injector],
      multi: true
    }];
    var BrowserGetTestability = (function() {
      function BrowserGetTestability() {}
      BrowserGetTestability.init = function() {
        _angular_core.setTestabilityGetter(new BrowserGetTestability());
      };
      BrowserGetTestability.prototype.addToWindow = function(registry) {
        _angular_core.ɵglobal['getAngularTestability'] = function(elem, findInAncestors) {
          if (findInAncestors === void 0) {
            findInAncestors = true;
          }
          var testability = registry.findTestabilityInTree(elem, findInAncestors);
          if (testability == null) {
            throw new Error('Could not find testability for element.');
          }
          return testability;
        };
        _angular_core.ɵglobal['getAllAngularTestabilities'] = function() {
          return registry.getAllTestabilities();
        };
        _angular_core.ɵglobal['getAllAngularRootElements'] = function() {
          return registry.getAllRootElements();
        };
        var whenAllStable = function(callback) {
          var testabilities = _angular_core.ɵglobal['getAllAngularTestabilities']();
          var count = testabilities.length;
          var didWork = false;
          var decrement = function(didWork_) {
            didWork = didWork || didWork_;
            count--;
            if (count == 0) {
              callback(didWork);
            }
          };
          testabilities.forEach(function(testability) {
            testability.whenStable(decrement);
          });
        };
        if (!_angular_core.ɵglobal['frameworkStabilizers']) {
          _angular_core.ɵglobal['frameworkStabilizers'] = [];
        }
        _angular_core.ɵglobal['frameworkStabilizers'].push(whenAllStable);
      };
      BrowserGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
        if (elem == null) {
          return null;
        }
        var t = registry.getTestability(elem);
        if (t != null) {
          return t;
        } else if (!findInAncestors) {
          return null;
        }
        if (getDOM().isShadowRoot(elem)) {
          return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
        }
        return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
      };
      return BrowserGetTestability;
    }());
    var Title = (function() {
      function Title(_doc) {
        this._doc = _doc;
      }
      Title.prototype.getTitle = function() {
        return getDOM().getTitle(this._doc);
      };
      Title.prototype.setTitle = function(newTitle) {
        getDOM().setTitle(this._doc, newTitle);
      };
      Title.decorators = [{type: _angular_core.Injectable}];
      Title.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [DOCUMENT$1]
          }]
        }];
      };
      return Title;
    }());
    function exportNgVar(name, value) {
      if (typeof COMPILED === 'undefined' || !COMPILED) {
        var ng = _angular_core.ɵglobal['ng'] = ((_angular_core.ɵglobal['ng'])) || {};
        ng[name] = value;
      }
    }
    var CORE_TOKENS = {
      'ApplicationRef': _angular_core.ApplicationRef,
      'NgZone': _angular_core.NgZone
    };
    var INSPECT_GLOBAL_NAME = 'probe';
    var CORE_TOKENS_GLOBAL_NAME = 'coreTokens';
    function inspectNativeElement(element) {
      return _angular_core.getDebugNode(element);
    }
    function _createNgProbe(coreTokens) {
      exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
      exportNgVar(CORE_TOKENS_GLOBAL_NAME, __assign({}, CORE_TOKENS, _ngProbeTokensToMap(coreTokens || [])));
      return function() {
        return inspectNativeElement;
      };
    }
    function _ngProbeTokensToMap(tokens) {
      return tokens.reduce(function(prev, t) {
        return (prev[t.name] = t.token, prev);
      }, {});
    }
    var ELEMENT_PROBE_PROVIDERS = [{
      provide: _angular_core.APP_INITIALIZER,
      useFactory: _createNgProbe,
      deps: [[_angular_core.NgProbeToken, new _angular_core.Optional()]],
      multi: true
    }];
    var EVENT_MANAGER_PLUGINS = new _angular_core.InjectionToken('EventManagerPlugins');
    var EventManager = (function() {
      function EventManager(plugins, _zone) {
        var _this = this;
        this._zone = _zone;
        this._eventNameToPlugin = new Map();
        plugins.forEach(function(p) {
          return p.manager = _this;
        });
        this._plugins = plugins.slice().reverse();
      }
      EventManager.prototype.addEventListener = function(element, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
      };
      EventManager.prototype.addGlobalEventListener = function(target, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
      };
      EventManager.prototype.getZone = function() {
        return this._zone;
      };
      EventManager.prototype._findPluginFor = function(eventName) {
        var plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
          return plugin;
        }
        var plugins = this._plugins;
        for (var i = 0; i < plugins.length; i++) {
          var plugin_1 = plugins[i];
          if (plugin_1.supports(eventName)) {
            this._eventNameToPlugin.set(eventName, plugin_1);
            return plugin_1;
          }
        }
        throw new Error("No event manager plugin found for event " + eventName);
      };
      EventManager.decorators = [{type: _angular_core.Injectable}];
      EventManager.ctorParameters = function() {
        return [{
          type: Array,
          decorators: [{
            type: _angular_core.Inject,
            args: [EVENT_MANAGER_PLUGINS]
          }]
        }, {type: _angular_core.NgZone}];
      };
      return EventManager;
    }());
    var EventManagerPlugin = (function() {
      function EventManagerPlugin(_doc) {
        this._doc = _doc;
      }
      EventManagerPlugin.prototype.addGlobalEventListener = function(element, eventName, handler) {
        var target = getDOM().getGlobalEventTarget(this._doc, element);
        if (!target) {
          throw new Error("Unsupported event target " + target + " for event " + eventName);
        }
        return this.addEventListener(target, eventName, handler);
      };
      return EventManagerPlugin;
    }());
    var SharedStylesHost = (function() {
      function SharedStylesHost() {
        this._stylesSet = new Set();
      }
      SharedStylesHost.prototype.addStyles = function(styles) {
        var _this = this;
        var additions = new Set();
        styles.forEach(function(style) {
          if (!_this._stylesSet.has(style)) {
            _this._stylesSet.add(style);
            additions.add(style);
          }
        });
        this.onStylesAdded(additions);
      };
      SharedStylesHost.prototype.onStylesAdded = function(additions) {};
      SharedStylesHost.prototype.getAllStyles = function() {
        return Array.from(this._stylesSet);
      };
      SharedStylesHost.decorators = [{type: _angular_core.Injectable}];
      SharedStylesHost.ctorParameters = function() {
        return [];
      };
      return SharedStylesHost;
    }());
    var DomSharedStylesHost = (function(_super) {
      __extends(DomSharedStylesHost, _super);
      function DomSharedStylesHost(_doc) {
        var _this = _super.call(this) || this;
        _this._doc = _doc;
        _this._hostNodes = new Set();
        _this._styleNodes = new Set();
        _this._hostNodes.add(_doc.head);
        return _this;
      }
      DomSharedStylesHost.prototype._addStylesToHost = function(styles, host) {
        var _this = this;
        styles.forEach(function(style) {
          var styleEl = _this._doc.createElement('style');
          styleEl.textContent = style;
          _this._styleNodes.add(host.appendChild(styleEl));
        });
      };
      DomSharedStylesHost.prototype.addHost = function(hostNode) {
        this._addStylesToHost(this._stylesSet, hostNode);
        this._hostNodes.add(hostNode);
      };
      DomSharedStylesHost.prototype.removeHost = function(hostNode) {
        this._hostNodes.delete(hostNode);
      };
      DomSharedStylesHost.prototype.onStylesAdded = function(additions) {
        var _this = this;
        this._hostNodes.forEach(function(hostNode) {
          return _this._addStylesToHost(additions, hostNode);
        });
      };
      DomSharedStylesHost.prototype.ngOnDestroy = function() {
        this._styleNodes.forEach(function(styleNode) {
          return getDOM().remove(styleNode);
        });
      };
      DomSharedStylesHost.decorators = [{type: _angular_core.Injectable}];
      DomSharedStylesHost.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [DOCUMENT$1]
          }]
        }];
      };
      return DomSharedStylesHost;
    }(SharedStylesHost));
    var NAMESPACE_URIS = {
      'svg': 'http://www.w3.org/2000/svg',
      'xhtml': 'http://www.w3.org/1999/xhtml',
      'xlink': 'http://www.w3.org/1999/xlink',
      'xml': 'http://www.w3.org/XML/1998/namespace',
      'xmlns': 'http://www.w3.org/2000/xmlns/'
    };
    var COMPONENT_REGEX = /%COMP%/g;
    var COMPONENT_VARIABLE = '%COMP%';
    var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
    var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
    function shimContentAttribute(componentShortId) {
      return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
    }
    function shimHostAttribute(componentShortId) {
      return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
    }
    function flattenStyles(compId, styles, target) {
      for (var i = 0; i < styles.length; i++) {
        var style = styles[i];
        if (Array.isArray(style)) {
          flattenStyles(compId, style, target);
        } else {
          style = style.replace(COMPONENT_REGEX, compId);
          target.push(style);
        }
      }
      return target;
    }
    function decoratePreventDefault(eventHandler) {
      return function(event) {
        var allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
          event.preventDefault();
          event.returnValue = false;
        }
      };
    }
    var DomRendererFactory2 = (function() {
      function DomRendererFactory2(eventManager, sharedStylesHost) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.defaultRenderer = new DefaultDomRenderer2(eventManager);
      }
      DomRendererFactory2.prototype.createRenderer = function(element, type) {
        if (!element || !type) {
          return this.defaultRenderer;
        }
        switch (type.encapsulation) {
          case _angular_core.ViewEncapsulation.Emulated:
            {
              var renderer = this.rendererByCompId.get(type.id);
              if (!renderer) {
                renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type);
                this.rendererByCompId.set(type.id, renderer);
              }
              ((renderer)).applyToHost(element);
              return renderer;
            }
          case _angular_core.ViewEncapsulation.Native:
            return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
          default:
            {
              if (!this.rendererByCompId.has(type.id)) {
                var styles = flattenStyles(type.id, type.styles, []);
                this.sharedStylesHost.addStyles(styles);
                this.rendererByCompId.set(type.id, this.defaultRenderer);
              }
              return this.defaultRenderer;
            }
        }
      };
      DomRendererFactory2.prototype.begin = function() {};
      DomRendererFactory2.prototype.end = function() {};
      DomRendererFactory2.decorators = [{type: _angular_core.Injectable}];
      DomRendererFactory2.ctorParameters = function() {
        return [{type: EventManager}, {type: DomSharedStylesHost}];
      };
      return DomRendererFactory2;
    }());
    var DefaultDomRenderer2 = (function() {
      function DefaultDomRenderer2(eventManager) {
        this.eventManager = eventManager;
        this.data = Object.create(null);
      }
      DefaultDomRenderer2.prototype.destroy = function() {};
      DefaultDomRenderer2.prototype.createElement = function(name, namespace) {
        if (namespace) {
          return document.createElementNS(NAMESPACE_URIS[namespace], name);
        }
        return document.createElement(name);
      };
      DefaultDomRenderer2.prototype.createComment = function(value) {
        return document.createComment(value);
      };
      DefaultDomRenderer2.prototype.createText = function(value) {
        return document.createTextNode(value);
      };
      DefaultDomRenderer2.prototype.appendChild = function(parent, newChild) {
        parent.appendChild(newChild);
      };
      DefaultDomRenderer2.prototype.insertBefore = function(parent, newChild, refChild) {
        if (parent) {
          parent.insertBefore(newChild, refChild);
        }
      };
      DefaultDomRenderer2.prototype.removeChild = function(parent, oldChild) {
        if (parent) {
          parent.removeChild(oldChild);
        }
      };
      DefaultDomRenderer2.prototype.selectRootElement = function(selectorOrNode) {
        var el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) : selectorOrNode;
        if (!el) {
          throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
        }
        el.textContent = '';
        return el;
      };
      DefaultDomRenderer2.prototype.parentNode = function(node) {
        return node.parentNode;
      };
      DefaultDomRenderer2.prototype.nextSibling = function(node) {
        return node.nextSibling;
      };
      DefaultDomRenderer2.prototype.setAttribute = function(el, name, value, namespace) {
        if (namespace) {
          name = namespace + ":" + name;
          var namespaceUri = NAMESPACE_URIS[namespace];
          if (namespaceUri) {
            el.setAttributeNS(namespaceUri, name, value);
          } else {
            el.setAttribute(name, value);
          }
        } else {
          el.setAttribute(name, value);
        }
      };
      DefaultDomRenderer2.prototype.removeAttribute = function(el, name, namespace) {
        if (namespace) {
          var namespaceUri = NAMESPACE_URIS[namespace];
          if (namespaceUri) {
            el.removeAttributeNS(namespaceUri, name);
          } else {
            el.removeAttribute(namespace + ":" + name);
          }
        } else {
          el.removeAttribute(name);
        }
      };
      DefaultDomRenderer2.prototype.addClass = function(el, name) {
        el.classList.add(name);
      };
      DefaultDomRenderer2.prototype.removeClass = function(el, name) {
        el.classList.remove(name);
      };
      DefaultDomRenderer2.prototype.setStyle = function(el, style, value, flags) {
        if (flags & _angular_core.RendererStyleFlags2.DashCase) {
          el.style.setProperty(style, value, !!(flags & _angular_core.RendererStyleFlags2.Important) ? 'important' : '');
        } else {
          el.style[style] = value;
        }
      };
      DefaultDomRenderer2.prototype.removeStyle = function(el, style, flags) {
        if (flags & _angular_core.RendererStyleFlags2.DashCase) {
          el.style.removeProperty(style);
        } else {
          el.style[style] = '';
        }
      };
      DefaultDomRenderer2.prototype.setProperty = function(el, name, value) {
        checkNoSyntheticProp(name, 'property');
        el[name] = value;
      };
      DefaultDomRenderer2.prototype.setValue = function(node, value) {
        node.nodeValue = value;
      };
      DefaultDomRenderer2.prototype.listen = function(target, event, callback) {
        checkNoSyntheticProp(event, 'listener');
        if (typeof target === 'string') {
          return (this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback)));
        }
        return ((this.eventManager.addEventListener(target, event, decoratePreventDefault(callback))));
      };
      return DefaultDomRenderer2;
    }());
    var AT_CHARCODE = '@'.charCodeAt(0);
    function checkNoSyntheticProp(name, nameKind) {
      if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error("Found the synthetic " + nameKind + " " + name + ". Please include either \"BrowserAnimationsModule\" or \"NoopAnimationsModule\" in your application.");
      }
    }
    var EmulatedEncapsulationDomRenderer2 = (function(_super) {
      __extends(EmulatedEncapsulationDomRenderer2, _super);
      function EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, component) {
        var _this = _super.call(this, eventManager) || this;
        _this.component = component;
        var styles = flattenStyles(component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        _this.contentAttr = shimContentAttribute(component.id);
        _this.hostAttr = shimHostAttribute(component.id);
        return _this;
      }
      EmulatedEncapsulationDomRenderer2.prototype.applyToHost = function(element) {
        _super.prototype.setAttribute.call(this, element, this.hostAttr, '');
      };
      EmulatedEncapsulationDomRenderer2.prototype.createElement = function(parent, name) {
        var el = _super.prototype.createElement.call(this, parent, name);
        _super.prototype.setAttribute.call(this, el, this.contentAttr, '');
        return el;
      };
      return EmulatedEncapsulationDomRenderer2;
    }(DefaultDomRenderer2));
    var ShadowDomRenderer = (function(_super) {
      __extends(ShadowDomRenderer, _super);
      function ShadowDomRenderer(eventManager, sharedStylesHost, hostEl, component) {
        var _this = _super.call(this, eventManager) || this;
        _this.sharedStylesHost = sharedStylesHost;
        _this.hostEl = hostEl;
        _this.component = component;
        _this.shadowRoot = ((hostEl)).createShadowRoot();
        _this.sharedStylesHost.addHost(_this.shadowRoot);
        var styles = flattenStyles(component.id, component.styles, []);
        for (var i = 0; i < styles.length; i++) {
          var styleEl = document.createElement('style');
          styleEl.textContent = styles[i];
          _this.shadowRoot.appendChild(styleEl);
        }
        return _this;
      }
      ShadowDomRenderer.prototype.nodeOrShadowRoot = function(node) {
        return node === this.hostEl ? this.shadowRoot : node;
      };
      ShadowDomRenderer.prototype.destroy = function() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
      };
      ShadowDomRenderer.prototype.appendChild = function(parent, newChild) {
        return _super.prototype.appendChild.call(this, this.nodeOrShadowRoot(parent), newChild);
      };
      ShadowDomRenderer.prototype.insertBefore = function(parent, newChild, refChild) {
        return _super.prototype.insertBefore.call(this, this.nodeOrShadowRoot(parent), newChild, refChild);
      };
      ShadowDomRenderer.prototype.removeChild = function(parent, oldChild) {
        return _super.prototype.removeChild.call(this, this.nodeOrShadowRoot(parent), oldChild);
      };
      ShadowDomRenderer.prototype.parentNode = function(node) {
        return this.nodeOrShadowRoot(_super.prototype.parentNode.call(this, this.nodeOrShadowRoot(node)));
      };
      return ShadowDomRenderer;
    }(DefaultDomRenderer2));
    var ɵ0 = function(v) {
      return '__zone_symbol__' + v;
    };
    var __symbol__ = (typeof Zone !== 'undefined') && ((Zone))['__symbol__'] || ɵ0;
    var ADD_EVENT_LISTENER = __symbol__('addEventListener');
    var REMOVE_EVENT_LISTENER = __symbol__('removeEventListener');
    var symbolNames = {};
    var FALSE = 'FALSE';
    var ANGULAR = 'ANGULAR';
    var NATIVE_ADD_LISTENER = 'addEventListener';
    var NATIVE_REMOVE_LISTENER = 'removeEventListener';
    var stopSymbol = '__zone_symbol__propagationStopped';
    var stopMethodSymbol = '__zone_symbol__stopImmediatePropagation';
    var blackListedEvents = (typeof Zone !== 'undefined') && ((Zone))[__symbol__('BLACK_LISTED_EVENTS')];
    var blackListedMap;
    if (blackListedEvents) {
      blackListedMap = {};
      blackListedEvents.forEach(function(eventName) {
        blackListedMap[eventName] = eventName;
      });
    }
    var isBlackListedEvent = function(eventName) {
      if (!blackListedMap) {
        return false;
      }
      return blackListedMap.hasOwnProperty(eventName);
    };
    var globalListener = function(event) {
      var symbolName = symbolNames[event.type];
      if (!symbolName) {
        return;
      }
      var taskDatas = this[symbolName];
      if (!taskDatas) {
        return;
      }
      var args = [event];
      if (taskDatas.length === 1) {
        var taskData = taskDatas[0];
        if (taskData.zone !== Zone.current) {
          return taskData.zone.run(taskData.handler, this, args);
        } else {
          return taskData.handler.apply(this, args);
        }
      } else {
        var copiedTasks = taskDatas.slice();
        for (var i = 0; i < copiedTasks.length; i++) {
          if (((event))[stopSymbol] === true) {
            break;
          }
          var taskData = copiedTasks[i];
          if (taskData.zone !== Zone.current) {
            taskData.zone.run(taskData.handler, this, args);
          } else {
            taskData.handler.apply(this, args);
          }
        }
      }
    };
    var DomEventsPlugin = (function(_super) {
      __extends(DomEventsPlugin, _super);
      function DomEventsPlugin(doc, ngZone) {
        var _this = _super.call(this, doc) || this;
        _this.ngZone = ngZone;
        _this.patchEvent();
        return _this;
      }
      DomEventsPlugin.prototype.patchEvent = function() {
        if (!Event || !Event.prototype) {
          return;
        }
        if (((Event.prototype))[stopMethodSymbol]) {
          return;
        }
        var delegate = ((Event.prototype))[stopMethodSymbol] = Event.prototype.stopImmediatePropagation;
        Event.prototype.stopImmediatePropagation = function() {
          if (this) {
            this[stopSymbol] = true;
          }
          delegate && delegate.apply(this, arguments);
        };
      };
      DomEventsPlugin.prototype.supports = function(eventName) {
        return true;
      };
      DomEventsPlugin.prototype.addEventListener = function(element, eventName, handler) {
        var _this = this;
        var self = this;
        var zoneJsLoaded = element[ADD_EVENT_LISTENER];
        var callback = (handler);
        if (zoneJsLoaded && (!_angular_core.NgZone.isInAngularZone() || isBlackListedEvent(eventName))) {
          var symbolName = symbolNames[eventName];
          if (!symbolName) {
            symbolName = symbolNames[eventName] = __symbol__(ANGULAR + eventName + FALSE);
          }
          var taskDatas = ((element))[symbolName];
          var globalListenerRegistered = taskDatas && taskDatas.length > 0;
          if (!taskDatas) {
            taskDatas = ((element))[symbolName] = [];
          }
          var zone = isBlackListedEvent(eventName) ? Zone.root : Zone.current;
          if (taskDatas.length === 0) {
            taskDatas.push({
              zone: zone,
              handler: callback
            });
          } else {
            var callbackRegistered = false;
            for (var i = 0; i < taskDatas.length; i++) {
              if (taskDatas[i].handler === callback) {
                callbackRegistered = true;
                break;
              }
            }
            if (!callbackRegistered) {
              taskDatas.push({
                zone: zone,
                handler: callback
              });
            }
          }
          if (!globalListenerRegistered) {
            element[ADD_EVENT_LISTENER](eventName, globalListener, false);
          }
        } else {
          element[NATIVE_ADD_LISTENER](eventName, callback, false);
        }
        return function() {
          return _this.removeEventListener(element, eventName, callback);
        };
      };
      DomEventsPlugin.prototype.removeEventListener = function(target, eventName, callback) {
        var underlyingRemove = target[REMOVE_EVENT_LISTENER];
        if (!underlyingRemove) {
          return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        var symbolName = symbolNames[eventName];
        var taskDatas = symbolName && target[symbolName];
        if (!taskDatas) {
          return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        var found = false;
        for (var i = 0; i < taskDatas.length; i++) {
          if (taskDatas[i].handler === callback) {
            found = true;
            taskDatas.splice(i, 1);
            break;
          }
        }
        if (found) {
          if (taskDatas.length === 0) {
            underlyingRemove.apply(target, [eventName, globalListener, false]);
          }
        } else {
          target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
      };
      DomEventsPlugin.decorators = [{type: _angular_core.Injectable}];
      DomEventsPlugin.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [DOCUMENT$1]
          }]
        }, {type: _angular_core.NgZone}];
      };
      return DomEventsPlugin;
    }(EventManagerPlugin));
    var EVENT_NAMES = {
      'pan': true,
      'panstart': true,
      'panmove': true,
      'panend': true,
      'pancancel': true,
      'panleft': true,
      'panright': true,
      'panup': true,
      'pandown': true,
      'pinch': true,
      'pinchstart': true,
      'pinchmove': true,
      'pinchend': true,
      'pinchcancel': true,
      'pinchin': true,
      'pinchout': true,
      'press': true,
      'pressup': true,
      'rotate': true,
      'rotatestart': true,
      'rotatemove': true,
      'rotateend': true,
      'rotatecancel': true,
      'swipe': true,
      'swipeleft': true,
      'swiperight': true,
      'swipeup': true,
      'swipedown': true,
      'tap': true
    };
    var HAMMER_GESTURE_CONFIG = new _angular_core.InjectionToken('HammerGestureConfig');
    var HammerGestureConfig = (function() {
      function HammerGestureConfig() {
        this.events = [];
        this.overrides = {};
      }
      HammerGestureConfig.prototype.buildHammer = function(element) {
        var mc = new Hammer(element);
        mc.get('pinch').set({enable: true});
        mc.get('rotate').set({enable: true});
        for (var eventName in this.overrides) {
          mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
      };
      HammerGestureConfig.decorators = [{type: _angular_core.Injectable}];
      HammerGestureConfig.ctorParameters = function() {
        return [];
      };
      return HammerGestureConfig;
    }());
    var HammerGesturesPlugin = (function(_super) {
      __extends(HammerGesturesPlugin, _super);
      function HammerGesturesPlugin(doc, _config) {
        var _this = _super.call(this, doc) || this;
        _this._config = _config;
        return _this;
      }
      HammerGesturesPlugin.prototype.supports = function(eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
          return false;
        }
        if (!((window)).Hammer) {
          throw new Error("Hammer.js is not loaded, can not bind " + eventName + " event");
        }
        return true;
      };
      HammerGesturesPlugin.prototype.addEventListener = function(element, eventName, handler) {
        var _this = this;
        var zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        return zone.runOutsideAngular(function() {
          var mc = _this._config.buildHammer(element);
          var callback = function(eventObj) {
            zone.runGuarded(function() {
              handler(eventObj);
            });
          };
          mc.on(eventName, callback);
          return function() {
            return mc.off(eventName, callback);
          };
        });
      };
      HammerGesturesPlugin.prototype.isCustomEvent = function(eventName) {
        return this._config.events.indexOf(eventName) > -1;
      };
      HammerGesturesPlugin.decorators = [{type: _angular_core.Injectable}];
      HammerGesturesPlugin.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [DOCUMENT$1]
          }]
        }, {
          type: HammerGestureConfig,
          decorators: [{
            type: _angular_core.Inject,
            args: [HAMMER_GESTURE_CONFIG]
          }]
        }];
      };
      return HammerGesturesPlugin;
    }(EventManagerPlugin));
    var MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
    var ɵ0$1 = function(event) {
      return event.altKey;
    };
    var ɵ1$1 = function(event) {
      return event.ctrlKey;
    };
    var ɵ2$1 = function(event) {
      return event.metaKey;
    };
    var ɵ3 = function(event) {
      return event.shiftKey;
    };
    var MODIFIER_KEY_GETTERS = {
      'alt': ɵ0$1,
      'control': ɵ1$1,
      'meta': ɵ2$1,
      'shift': ɵ3
    };
    var KeyEventsPlugin = (function(_super) {
      __extends(KeyEventsPlugin, _super);
      function KeyEventsPlugin(doc) {
        return _super.call(this, doc) || this;
      }
      KeyEventsPlugin.prototype.supports = function(eventName) {
        return KeyEventsPlugin.parseEventName(eventName) != null;
      };
      KeyEventsPlugin.prototype.addEventListener = function(element, eventName, handler) {
        var parsedEvent = ((KeyEventsPlugin.parseEventName(eventName)));
        var outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(function() {
          return getDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
        });
      };
      KeyEventsPlugin.parseEventName = function(eventName) {
        var parts = eventName.toLowerCase().split('.');
        var domEventName = parts.shift();
        if ((parts.length === 0) || !(domEventName === 'keydown' || domEventName === 'keyup')) {
          return null;
        }
        var key = KeyEventsPlugin._normalizeKey(((parts.pop())));
        var fullKey = '';
        MODIFIER_KEYS.forEach(function(modifierName) {
          var index = parts.indexOf(modifierName);
          if (index > -1) {
            parts.splice(index, 1);
            fullKey += modifierName + '.';
          }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
          return null;
        }
        var result = {};
        result['domEventName'] = domEventName;
        result['fullKey'] = fullKey;
        return result;
      };
      KeyEventsPlugin.getEventFullKey = function(event) {
        var fullKey = '';
        var key = getDOM().getEventKey(event);
        key = key.toLowerCase();
        if (key === ' ') {
          key = 'space';
        } else if (key === '.') {
          key = 'dot';
        }
        MODIFIER_KEYS.forEach(function(modifierName) {
          if (modifierName != key) {
            var modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
            if (modifierGetter(event)) {
              fullKey += modifierName + '.';
            }
          }
        });
        fullKey += key;
        return fullKey;
      };
      KeyEventsPlugin.eventCallback = function(fullKey, handler, zone) {
        return function(event) {
          if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
            zone.runGuarded(function() {
              return handler(event);
            });
          }
        };
      };
      KeyEventsPlugin._normalizeKey = function(keyName) {
        switch (keyName) {
          case 'esc':
            return 'escape';
          default:
            return keyName;
        }
      };
      KeyEventsPlugin.decorators = [{type: _angular_core.Injectable}];
      KeyEventsPlugin.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [DOCUMENT$1]
          }]
        }];
      };
      return KeyEventsPlugin;
    }(EventManagerPlugin));
    var InertBodyHelper = (function() {
      function InertBodyHelper(defaultDoc, DOM) {
        this.defaultDoc = defaultDoc;
        this.DOM = DOM;
        var inertDocument = this.DOM.createHtmlDocument();
        this.inertBodyElement = inertDocument.body;
        if (this.inertBodyElement == null) {
          var inertHtml = this.DOM.createElement('html', inertDocument);
          this.inertBodyElement = this.DOM.createElement('body', inertDocument);
          this.DOM.appendChild(inertHtml, this.inertBodyElement);
          this.DOM.appendChild(inertDocument, inertHtml);
        }
        this.DOM.setInnerHTML(this.inertBodyElement, '<svg><g onload="this.parentNode.remove()"></g></svg>');
        if (this.inertBodyElement.querySelector && !this.inertBodyElement.querySelector('svg')) {
          this.getInertBodyElement = this.getInertBodyElement_XHR;
          return;
        }
        this.DOM.setInnerHTML(this.inertBodyElement, '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">');
        if (this.inertBodyElement.querySelector && this.inertBodyElement.querySelector('svg img')) {
          if (isDOMParserAvailable()) {
            this.getInertBodyElement = this.getInertBodyElement_DOMParser;
            return;
          }
        }
        this.getInertBodyElement = this.getInertBodyElement_InertDocument;
      }
      InertBodyHelper.prototype.getInertBodyElement_XHR = function(html) {
        html = '<body><remove></remove>' + html + '</body>';
        try {
          html = encodeURI(html);
        } catch (e) {
          return null;
        }
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'document';
        xhr.open('GET', 'data:text/html;charset=utf-8,' + html, false);
        xhr.send(null);
        var body = xhr.response.body;
        body.removeChild(((body.firstChild)));
        return body;
      };
      InertBodyHelper.prototype.getInertBodyElement_DOMParser = function(html) {
        html = '<body><remove></remove>' + html + '</body>';
        try {
          var body = (new ((window)).DOMParser().parseFromString(html, 'text/html').body);
          body.removeChild(((body.firstChild)));
          return body;
        } catch (e) {
          return null;
        }
      };
      InertBodyHelper.prototype.getInertBodyElement_InertDocument = function(html) {
        var templateEl = this.DOM.createElement('template');
        if ('content' in templateEl) {
          this.DOM.setInnerHTML(templateEl, html);
          return templateEl;
        }
        this.DOM.setInnerHTML(this.inertBodyElement, html);
        if (this.defaultDoc.documentMode) {
          this.stripCustomNsAttrs(this.inertBodyElement);
        }
        return this.inertBodyElement;
      };
      InertBodyHelper.prototype.stripCustomNsAttrs = function(el) {
        var _this = this;
        this.DOM.attributeMap(el).forEach(function(_, attrName) {
          if (attrName === 'xmlns:ns1' || attrName.indexOf('ns1:') === 0) {
            _this.DOM.removeAttribute(el, attrName);
          }
        });
        for (var _i = 0,
            _a = this.DOM.childNodesAsList(el); _i < _a.length; _i++) {
          var n = _a[_i];
          if (this.DOM.isElementNode(n))
            this.stripCustomNsAttrs((n));
        }
      };
      return InertBodyHelper;
    }());
    function isDOMParserAvailable() {
      try {
        return !!((window)).DOMParser;
      } catch (e) {
        return false;
      }
    }
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
    function sanitizeUrl(url) {
      url = String(url);
      if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN))
        return url;
      if (_angular_core.isDevMode()) {
        getDOM().log("WARNING: sanitizing unsafe URL value " + url + " (see http://g.co/ng/security#xss)");
      }
      return 'unsafe:' + url;
    }
    function sanitizeSrcset(srcset) {
      srcset = String(srcset);
      return srcset.split(',').map(function(srcset) {
        return sanitizeUrl(srcset.trim());
      }).join(', ');
    }
    function tagSet(tags) {
      var res = {};
      for (var _i = 0,
          _a = tags.split(','); _i < _a.length; _i++) {
        var t = _a[_i];
        res[t] = true;
      }
      return res;
    }
    function merge() {
      var sets = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
      }
      var res = {};
      for (var _a = 0,
          sets_1 = sets; _a < sets_1.length; _a++) {
        var s = sets_1[_a];
        for (var v in s) {
          if (s.hasOwnProperty(v))
            res[v] = true;
        }
      }
      return res;
    }
    var VOID_ELEMENTS = tagSet('area,br,col,hr,img,wbr');
    var OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
    var OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet('rp,rt');
    var OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
    var BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet('address,article,' + 'aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' + 'h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'));
    var INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet('a,abbr,acronym,audio,b,' + 'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,' + 'samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'));
    var VALID_ELEMENTS = merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
    var URI_ATTRS = tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
    var SRCSET_ATTRS = tagSet('srcset');
    var HTML_ATTRS = tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,' + 'compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,' + 'ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,' + 'scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,' + 'valign,value,vspace,width');
    var VALID_ATTRS = merge(URI_ATTRS, SRCSET_ATTRS, HTML_ATTRS);
    var SanitizingHtmlSerializer = (function() {
      function SanitizingHtmlSerializer() {
        this.sanitizedSomething = false;
        this.buf = [];
        this.DOM = getDOM();
      }
      SanitizingHtmlSerializer.prototype.sanitizeChildren = function(el) {
        var current = ((this.DOM.firstChild(el)));
        while (current) {
          if (this.DOM.isElementNode(current)) {
            this.startElement((current));
          } else if (this.DOM.isTextNode(current)) {
            this.chars(((this.DOM.nodeValue(current))));
          } else {
            this.sanitizedSomething = true;
          }
          if (this.DOM.firstChild(current)) {
            current = ((this.DOM.firstChild(current)));
            continue;
          }
          while (current) {
            if (this.DOM.isElementNode(current)) {
              this.endElement((current));
            }
            var next = this.checkClobberedElement(current, ((this.DOM.nextSibling(current))));
            if (next) {
              current = next;
              break;
            }
            current = this.checkClobberedElement(current, ((this.DOM.parentElement(current))));
          }
        }
        return this.buf.join('');
      };
      SanitizingHtmlSerializer.prototype.startElement = function(element) {
        var _this = this;
        var tagName = this.DOM.nodeName(element).toLowerCase();
        if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
          this.sanitizedSomething = true;
          return;
        }
        this.buf.push('<');
        this.buf.push(tagName);
        this.DOM.attributeMap(element).forEach(function(value, attrName) {
          var lower = attrName.toLowerCase();
          if (!VALID_ATTRS.hasOwnProperty(lower)) {
            _this.sanitizedSomething = true;
            return;
          }
          if (URI_ATTRS[lower])
            value = sanitizeUrl(value);
          if (SRCSET_ATTRS[lower])
            value = sanitizeSrcset(value);
          _this.buf.push(' ');
          _this.buf.push(attrName);
          _this.buf.push('="');
          _this.buf.push(encodeEntities(value));
          _this.buf.push('"');
        });
        this.buf.push('>');
      };
      SanitizingHtmlSerializer.prototype.endElement = function(current) {
        var tagName = this.DOM.nodeName(current).toLowerCase();
        if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
          this.buf.push('</');
          this.buf.push(tagName);
          this.buf.push('>');
        }
      };
      SanitizingHtmlSerializer.prototype.chars = function(chars) {
        this.buf.push(encodeEntities(chars));
      };
      SanitizingHtmlSerializer.prototype.checkClobberedElement = function(node, nextNode) {
        if (nextNode && this.DOM.contains(node, nextNode)) {
          throw new Error("Failed to sanitize html because the element is clobbered: " + this.DOM.getOuterHTML(node));
        }
        return nextNode;
      };
      return SanitizingHtmlSerializer;
    }());
    var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
    function encodeEntities(value) {
      return value.replace(/&/g, '&amp;').replace(SURROGATE_PAIR_REGEXP, function(match) {
        var hi = match.charCodeAt(0);
        var low = match.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
      }).replace(NON_ALPHANUMERIC_REGEXP, function(match) {
        return '&#' + match.charCodeAt(0) + ';';
      }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    var inertBodyHelper;
    function sanitizeHtml(defaultDoc, unsafeHtmlInput) {
      var DOM = getDOM();
      var inertBodyElement = null;
      try {
        inertBodyHelper = inertBodyHelper || new InertBodyHelper(defaultDoc, DOM);
        var unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : '';
        inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
        var mXSSAttempts = 5;
        var parsedHtml = unsafeHtml;
        do {
          if (mXSSAttempts === 0) {
            throw new Error('Failed to sanitize html because the input is unstable');
          }
          mXSSAttempts--;
          unsafeHtml = parsedHtml;
          parsedHtml = DOM.getInnerHTML(inertBodyElement);
          inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
        } while (unsafeHtml !== parsedHtml);
        var sanitizer = new SanitizingHtmlSerializer();
        var safeHtml = sanitizer.sanitizeChildren(DOM.getTemplateContent(inertBodyElement) || inertBodyElement);
        if (_angular_core.isDevMode() && sanitizer.sanitizedSomething) {
          DOM.log('WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).');
        }
        return safeHtml;
      } finally {
        if (inertBodyElement) {
          var parent_1 = DOM.getTemplateContent(inertBodyElement) || inertBodyElement;
          for (var _i = 0,
              _a = DOM.childNodesAsList(parent_1); _i < _a.length; _i++) {
            var child = _a[_i];
            DOM.removeChild(parent_1, child);
          }
        }
      }
    }
    var VALUES = '[-,."\'%_!# a-zA-Z0-9]+';
    var TRANSFORMATION_FNS = '(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?';
    var COLOR_FNS = '(?:rgb|hsl)a?';
    var GRADIENTS = '(?:repeating-)?(?:linear|radial)-gradient';
    var CSS3_FNS = '(?:calc|attr)';
    var FN_ARGS = '\\([-0-9.%, #a-zA-Z]+\\)';
    var SAFE_STYLE_VALUE = new RegExp("^(" + VALUES + "|" + ("(?:" + TRANSFORMATION_FNS + "|" + COLOR_FNS + "|" + GRADIENTS + "|" + CSS3_FNS + ")") + (FN_ARGS + ")$"), 'g');
    var URL_RE = /^url\(([^)]+)\)$/;
    function hasBalancedQuotes(value) {
      var outsideSingle = true;
      var outsideDouble = true;
      for (var i = 0; i < value.length; i++) {
        var c = value.charAt(i);
        if (c === '\'' && outsideDouble) {
          outsideSingle = !outsideSingle;
        } else if (c === '"' && outsideSingle) {
          outsideDouble = !outsideDouble;
        }
      }
      return outsideSingle && outsideDouble;
    }
    function sanitizeStyle(value) {
      value = String(value).trim();
      if (!value)
        return '';
      var urlMatch = value.match(URL_RE);
      if ((urlMatch && sanitizeUrl(urlMatch[1]) === urlMatch[1]) || value.match(SAFE_STYLE_VALUE) && hasBalancedQuotes(value)) {
        return value;
      }
      if (_angular_core.isDevMode()) {
        getDOM().log("WARNING: sanitizing unsafe style value " + value + " (see http://g.co/ng/security#xss).");
      }
      return 'unsafe';
    }
    var DomSanitizer = (function() {
      function DomSanitizer() {}
      return DomSanitizer;
    }());
    var DomSanitizerImpl = (function(_super) {
      __extends(DomSanitizerImpl, _super);
      function DomSanitizerImpl(_doc) {
        var _this = _super.call(this) || this;
        _this._doc = _doc;
        return _this;
      }
      DomSanitizerImpl.prototype.sanitize = function(ctx, value) {
        if (value == null)
          return null;
        switch (ctx) {
          case _angular_core.SecurityContext.NONE:
            return (value);
          case _angular_core.SecurityContext.HTML:
            if (value instanceof SafeHtmlImpl)
              return value.changingThisBreaksApplicationSecurity;
            this.checkNotSafeValue(value, 'HTML');
            return sanitizeHtml(this._doc, String(value));
          case _angular_core.SecurityContext.STYLE:
            if (value instanceof SafeStyleImpl)
              return value.changingThisBreaksApplicationSecurity;
            this.checkNotSafeValue(value, 'Style');
            return sanitizeStyle((value));
          case _angular_core.SecurityContext.SCRIPT:
            if (value instanceof SafeScriptImpl)
              return value.changingThisBreaksApplicationSecurity;
            this.checkNotSafeValue(value, 'Script');
            throw new Error('unsafe value used in a script context');
          case _angular_core.SecurityContext.URL:
            if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
              return value.changingThisBreaksApplicationSecurity;
            }
            this.checkNotSafeValue(value, 'URL');
            return sanitizeUrl(String(value));
          case _angular_core.SecurityContext.RESOURCE_URL:
            if (value instanceof SafeResourceUrlImpl) {
              return value.changingThisBreaksApplicationSecurity;
            }
            this.checkNotSafeValue(value, 'ResourceURL');
            throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
          default:
            throw new Error("Unexpected SecurityContext " + ctx + " (see http://g.co/ng/security#xss)");
        }
      };
      DomSanitizerImpl.prototype.checkNotSafeValue = function(value, expectedType) {
        if (value instanceof SafeValueImpl) {
          throw new Error("Required a safe " + expectedType + ", got a " + value.getTypeName() + " " + "(see http://g.co/ng/security#xss)");
        }
      };
      DomSanitizerImpl.prototype.bypassSecurityTrustHtml = function(value) {
        return new SafeHtmlImpl(value);
      };
      DomSanitizerImpl.prototype.bypassSecurityTrustStyle = function(value) {
        return new SafeStyleImpl(value);
      };
      DomSanitizerImpl.prototype.bypassSecurityTrustScript = function(value) {
        return new SafeScriptImpl(value);
      };
      DomSanitizerImpl.prototype.bypassSecurityTrustUrl = function(value) {
        return new SafeUrlImpl(value);
      };
      DomSanitizerImpl.prototype.bypassSecurityTrustResourceUrl = function(value) {
        return new SafeResourceUrlImpl(value);
      };
      DomSanitizerImpl.decorators = [{type: _angular_core.Injectable}];
      DomSanitizerImpl.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [DOCUMENT$1]
          }]
        }];
      };
      return DomSanitizerImpl;
    }(DomSanitizer));
    var SafeValueImpl = (function() {
      function SafeValueImpl(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
      }
      SafeValueImpl.prototype.toString = function() {
        return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity + " (see http://g.co/ng/security#xss)";
      };
      return SafeValueImpl;
    }());
    var SafeHtmlImpl = (function(_super) {
      __extends(SafeHtmlImpl, _super);
      function SafeHtmlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      SafeHtmlImpl.prototype.getTypeName = function() {
        return 'HTML';
      };
      return SafeHtmlImpl;
    }(SafeValueImpl));
    var SafeStyleImpl = (function(_super) {
      __extends(SafeStyleImpl, _super);
      function SafeStyleImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      SafeStyleImpl.prototype.getTypeName = function() {
        return 'Style';
      };
      return SafeStyleImpl;
    }(SafeValueImpl));
    var SafeScriptImpl = (function(_super) {
      __extends(SafeScriptImpl, _super);
      function SafeScriptImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      SafeScriptImpl.prototype.getTypeName = function() {
        return 'Script';
      };
      return SafeScriptImpl;
    }(SafeValueImpl));
    var SafeUrlImpl = (function(_super) {
      __extends(SafeUrlImpl, _super);
      function SafeUrlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      SafeUrlImpl.prototype.getTypeName = function() {
        return 'URL';
      };
      return SafeUrlImpl;
    }(SafeValueImpl));
    var SafeResourceUrlImpl = (function(_super) {
      __extends(SafeResourceUrlImpl, _super);
      function SafeResourceUrlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      SafeResourceUrlImpl.prototype.getTypeName = function() {
        return 'ResourceURL';
      };
      return SafeResourceUrlImpl;
    }(SafeValueImpl));
    var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [{
      provide: _angular_core.PLATFORM_ID,
      useValue: _angular_common.ɵPLATFORM_BROWSER_ID
    }, {
      provide: _angular_core.PLATFORM_INITIALIZER,
      useValue: initDomAdapter,
      multi: true
    }, {
      provide: _angular_common.PlatformLocation,
      useClass: BrowserPlatformLocation,
      deps: [DOCUMENT$1]
    }, {
      provide: DOCUMENT$1,
      useFactory: _document,
      deps: []
    }];
    var BROWSER_SANITIZATION_PROVIDERS = [{
      provide: _angular_core.Sanitizer,
      useExisting: DomSanitizer
    }, {
      provide: DomSanitizer,
      useClass: DomSanitizerImpl,
      deps: [DOCUMENT$1]
    }];
    var platformBrowser = _angular_core.createPlatformFactory(_angular_core.platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
    function initDomAdapter() {
      BrowserDomAdapter.makeCurrent();
      BrowserGetTestability.init();
    }
    function errorHandler() {
      return new _angular_core.ErrorHandler();
    }
    function _document() {
      return document;
    }
    var BrowserModule = (function() {
      function BrowserModule(parentModule) {
        if (parentModule) {
          throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.");
        }
      }
      BrowserModule.withServerTransition = function(params) {
        return {
          ngModule: BrowserModule,
          providers: [{
            provide: _angular_core.APP_ID,
            useValue: params.appId
          }, {
            provide: TRANSITION_ID,
            useExisting: _angular_core.APP_ID
          }, SERVER_TRANSITION_PROVIDERS]
        };
      };
      BrowserModule.decorators = [{
        type: _angular_core.NgModule,
        args: [{
          providers: [BROWSER_SANITIZATION_PROVIDERS, {
            provide: _angular_core.ErrorHandler,
            useFactory: errorHandler,
            deps: []
          }, {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: DomEventsPlugin,
            multi: true
          }, {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: KeyEventsPlugin,
            multi: true
          }, {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: HammerGesturesPlugin,
            multi: true
          }, {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerGestureConfig
          }, DomRendererFactory2, {
            provide: _angular_core.RendererFactory2,
            useExisting: DomRendererFactory2
          }, {
            provide: SharedStylesHost,
            useExisting: DomSharedStylesHost
          }, DomSharedStylesHost, _angular_core.Testability, EventManager, ELEMENT_PROBE_PROVIDERS, Meta, Title],
          exports: [_angular_common.CommonModule, _angular_core.ApplicationModule]
        }]
      }];
      BrowserModule.ctorParameters = function() {
        return [{
          type: BrowserModule,
          decorators: [{type: _angular_core.Optional}, {type: _angular_core.SkipSelf}]
        }];
      };
      return BrowserModule;
    }());
    var win = typeof window !== 'undefined' && window || ({});
    var ChangeDetectionPerfRecord = (function() {
      function ChangeDetectionPerfRecord(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
      }
      return ChangeDetectionPerfRecord;
    }());
    var AngularProfiler = (function() {
      function AngularProfiler(ref) {
        this.appRef = ref.injector.get(_angular_core.ApplicationRef);
      }
      AngularProfiler.prototype.timeChangeDetection = function(config) {
        var record = config && config['record'];
        var profileName = 'Change Detection';
        var isProfilerAvailable = win.console.profile != null;
        if (record && isProfilerAvailable) {
          win.console.profile(profileName);
        }
        var start = getDOM().performanceNow();
        var numTicks = 0;
        while (numTicks < 5 || (getDOM().performanceNow() - start) < 500) {
          this.appRef.tick();
          numTicks++;
        }
        var end = getDOM().performanceNow();
        if (record && isProfilerAvailable) {
          ((win.console.profileEnd))(profileName);
        }
        var msPerTick = (end - start) / numTicks;
        win.console.log("ran " + numTicks + " change detection cycles");
        win.console.log(msPerTick.toFixed(2) + " ms per check");
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
      };
      return AngularProfiler;
    }());
    var PROFILER_GLOBAL_NAME = 'profiler';
    function enableDebugTools(ref) {
      exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
      return ref;
    }
    function disableDebugTools() {
      exportNgVar(PROFILER_GLOBAL_NAME, null);
    }
    function escapeHtml(text) {
      var escapedText = {
        '&': '&a;',
        '"': '&q;',
        '\'': '&s;',
        '<': '&l;',
        '>': '&g;'
      };
      return text.replace(/[&"'<>]/g, function(s) {
        return escapedText[s];
      });
    }
    function unescapeHtml(text) {
      var unescapedText = {
        '&a;': '&',
        '&q;': '"',
        '&s;': '\'',
        '&l;': '<',
        '&g;': '>'
      };
      return text.replace(/&[^;]+;/g, function(s) {
        return unescapedText[s];
      });
    }
    function makeStateKey(key) {
      return (key);
    }
    var TransferState = (function() {
      function TransferState() {
        this.store = {};
        this.onSerializeCallbacks = {};
      }
      TransferState.init = function(initState) {
        var transferState = new TransferState();
        transferState.store = initState;
        return transferState;
      };
      TransferState.prototype.get = function(key, defaultValue) {
        return this.store[key] !== undefined ? (this.store[key]) : defaultValue;
      };
      TransferState.prototype.set = function(key, value) {
        this.store[key] = value;
      };
      TransferState.prototype.remove = function(key) {
        delete this.store[key];
      };
      TransferState.prototype.hasKey = function(key) {
        return this.store.hasOwnProperty(key);
      };
      TransferState.prototype.onSerialize = function(key, callback) {
        this.onSerializeCallbacks[key] = callback;
      };
      TransferState.prototype.toJson = function() {
        for (var key in this.onSerializeCallbacks) {
          if (this.onSerializeCallbacks.hasOwnProperty(key)) {
            try {
              this.store[key] = this.onSerializeCallbacks[key]();
            } catch (e) {
              console.warn('Exception in onSerialize callback: ', e);
            }
          }
        }
        return JSON.stringify(this.store);
      };
      TransferState.decorators = [{type: _angular_core.Injectable}];
      TransferState.ctorParameters = function() {
        return [];
      };
      return TransferState;
    }());
    function initTransferState(doc, appId) {
      var script = doc.getElementById(appId + '-state');
      var initialState = {};
      if (script && script.textContent) {
        try {
          initialState = JSON.parse(unescapeHtml(script.textContent));
        } catch (e) {
          console.warn('Exception while restoring TransferState for app ' + appId, e);
        }
      }
      return TransferState.init(initialState);
    }
    var BrowserTransferStateModule = (function() {
      function BrowserTransferStateModule() {}
      BrowserTransferStateModule.decorators = [{
        type: _angular_core.NgModule,
        args: [{providers: [{
            provide: TransferState,
            useFactory: initTransferState,
            deps: [DOCUMENT$1, _angular_core.APP_ID]
          }]}]
      }];
      BrowserTransferStateModule.ctorParameters = function() {
        return [];
      };
      return BrowserTransferStateModule;
    }());
    var By = (function() {
      function By() {}
      By.all = function() {
        return function(debugElement) {
          return true;
        };
      };
      By.css = function(selector) {
        return function(debugElement) {
          return debugElement.nativeElement != null ? getDOM().elementMatches(debugElement.nativeElement, selector) : false;
        };
      };
      By.directive = function(type) {
        return function(debugElement) {
          return ((debugElement.providerTokens)).indexOf(type) !== -1;
        };
      };
      return By;
    }());
    var VERSION = new _angular_core.Version('5.2.9');
    exports.BrowserModule = BrowserModule;
    exports.platformBrowser = platformBrowser;
    exports.Meta = Meta;
    exports.Title = Title;
    exports.disableDebugTools = disableDebugTools;
    exports.enableDebugTools = enableDebugTools;
    exports.BrowserTransferStateModule = BrowserTransferStateModule;
    exports.TransferState = TransferState;
    exports.makeStateKey = makeStateKey;
    exports.By = By;
    exports.DOCUMENT = DOCUMENT$1;
    exports.EVENT_MANAGER_PLUGINS = EVENT_MANAGER_PLUGINS;
    exports.EventManager = EventManager;
    exports.HAMMER_GESTURE_CONFIG = HAMMER_GESTURE_CONFIG;
    exports.HammerGestureConfig = HammerGestureConfig;
    exports.DomSanitizer = DomSanitizer;
    exports.VERSION = VERSION;
    exports.ɵBROWSER_SANITIZATION_PROVIDERS = BROWSER_SANITIZATION_PROVIDERS;
    exports.ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS = INTERNAL_BROWSER_PLATFORM_PROVIDERS;
    exports.ɵinitDomAdapter = initDomAdapter;
    exports.ɵBrowserDomAdapter = BrowserDomAdapter;
    exports.ɵBrowserPlatformLocation = BrowserPlatformLocation;
    exports.ɵTRANSITION_ID = TRANSITION_ID;
    exports.ɵBrowserGetTestability = BrowserGetTestability;
    exports.ɵescapeHtml = escapeHtml;
    exports.ɵELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS;
    exports.ɵDomAdapter = DomAdapter;
    exports.ɵgetDOM = getDOM;
    exports.ɵsetRootDomAdapter = setRootDomAdapter;
    exports.ɵDomRendererFactory2 = DomRendererFactory2;
    exports.ɵNAMESPACE_URIS = NAMESPACE_URIS;
    exports.ɵflattenStyles = flattenStyles;
    exports.ɵshimContentAttribute = shimContentAttribute;
    exports.ɵshimHostAttribute = shimHostAttribute;
    exports.ɵDomEventsPlugin = DomEventsPlugin;
    exports.ɵHammerGesturesPlugin = HammerGesturesPlugin;
    exports.ɵKeyEventsPlugin = KeyEventsPlugin;
    exports.ɵDomSharedStylesHost = DomSharedStylesHost;
    exports.ɵSharedStylesHost = SharedStylesHost;
    exports.ɵb = _document;
    exports.ɵa = errorHandler;
    exports.ɵi = GenericBrowserDomAdapter;
    exports.ɵg = SERVER_TRANSITION_PROVIDERS;
    exports.ɵf = appInitializerFactory;
    exports.ɵc = initTransferState;
    exports.ɵh = _createNgProbe;
    exports.ɵd = EventManagerPlugin;
    exports.ɵe = DomSanitizerImpl;
    Object.defineProperty(exports, '__esModule', {value: true});
  })));
})(require('process'));
