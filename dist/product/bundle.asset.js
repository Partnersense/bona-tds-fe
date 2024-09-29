/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9929:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(5338);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var axios = __webpack_require__(1083);
;// CONCATENATED MODULE: ./src/product/apiClient.js


// Configure Axios instance
var apiClient = axios/* default */.A.create({
  baseURL: 'https://bona-tds-webapp.azurewebsites.net/api',
  // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '843cc8c8-9f05-4ebc-8901-bbc598282eca' // Replace with your actual API key
  }
});
/* harmony default export */ const product_apiClient = (apiClient);
;// CONCATENATED MODULE: ./src/product/inriverClient.js


// Configure Axios instance
var inriverClient = axios/* default */.A.create({
  baseURL: 'https://apieuw.productmarketingcloud.com',
  headers: {
    'Content-Type': 'application/json',
    'X-inRiver-APIKey': 'ef6eedc4c83be949457a0ed72c1adb54'
  }
});
/* harmony default export */ const product_inriverClient = (inriverClient);
;// CONCATENATED MODULE: ./src/product/inboundExtensionClient.js

var extensionApiKey = "1f3e9a48-45bc-4f4d-8d97-a48b7c59a1e1";
var byteArray = "apikey:".concat(extensionApiKey);
var base64String = btoa(byteArray); // Encode to Base64

// Set up headers as an object (Axios expects an object, not a Headers instance)
var headers = {
  Authorization: "Basic ".concat(base64String),
  'Content-Type': 'application/json'
};

// Configure Axios instance with the correct headers
var inboundExtensionClient = axios/* default */.A.create({
  baseURL: 'https://inbound.productmarketingcloud.com/api/inbounddata/bonaab/test',
  headers: headers
});
/* harmony default export */ const product_inboundExtensionClient = (inboundExtensionClient);
// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.es.js + 1 modules
var index_es = __webpack_require__(982);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var free_solid_svg_icons = __webpack_require__(6188);
;// CONCATENATED MODULE: ./src/product/App.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var App = function App() {
  // State Definitions
  var _useState = (0,react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    selectedItem = _useState2[0],
    setSelectedItem = _useState2[1];
  var _useState3 = (0,react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    markets = _useState4[0],
    setMarkets = _useState4[1];
  var _useState5 = (0,react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    versions = _useState6[0],
    setVersions = _useState6[1];
  var _useState7 = (0,react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    jobs = _useState8[0],
    setJobs = _useState8[1]; // Track all jobs for the queue
  var _useState9 = (0,react.useState)({
      message: '',
      type: ''
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    notification = _useState10[0],
    setNotification = _useState10[1];
  var _useState11 = (0,react.useState)({}),
    _useState12 = _slicedToArray(_useState11, 2),
    expandedMarkets = _useState12[0],
    setExpandedMarkets = _useState12[1]; // Track expanded states for markets
  var _useState13 = (0,react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    isCategoryValid = _useState14[0],
    setIsCategoryValid = _useState14[1]; // Track if the category is valid
  var _useState15 = (0,react.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    selectedMarket = _useState16[0],
    setSelectedMarket = _useState16[1]; // Track selected market
  var _useState17 = (0,react.useState)([]),
    _useState18 = _slicedToArray(_useState17, 2),
    todaysVersions = _useState18[0],
    setTodaysVersions = _useState18[1]; // Track today's versions
  var _useState19 = (0,react.useState)([]),
    _useState20 = _slicedToArray(_useState19, 2),
    todaysPreviews = _useState20[0],
    setTodaysPreviews = _useState20[1]; // Track today's previews
  var _useState21 = (0,react.useState)('301'),
    _useState22 = _slicedToArray(_useState21, 2),
    itemId = _useState22[0],
    setItemId = _useState22[1]; // Initialize with the predefined '301'
  var _useState23 = (0,react.useState)('Dummy'),
    _useState24 = _slicedToArray(_useState23, 2),
    currentCategory = _useState24[0],
    setCurrentCategory = _useState24[1]; // Track the current category

  var delay = function delay(ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  };

  // Show notification function
  var showNotification = function showNotification(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
    setNotification({
      message: message,
      type: type
    });
    setTimeout(function () {
      setNotification({
        message: '',
        type: ''
      });
    }, 3000);
  };

  // Fetch ProductTdsCategory as soon as possible
  var fetchProductTdsCategory = (0,react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var productTdsCategoryField, productTdsCategoryValue, cvlResponse, cvlValues, matchingCvl;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(data);
          if (data !== null && data !== undefined) {
            setItemId(data[0].id);
          }

          // Extract ProductTdsCategory value from fields
          productTdsCategoryField = data[0].fields.productTdsCategory;
          console.log(productTdsCategoryField);
          if (!(productTdsCategoryField && productTdsCategoryField.value)) {
            _context.next = 17;
            break;
          }
          productTdsCategoryValue = productTdsCategoryField.value;
          console.log("ProductTdsCategory value: ".concat(productTdsCategoryValue));

          // Fetch CVL values for TdsCategory
          _context.next = 10;
          return product_inriverClient.get("/api/v1.0.0/model/cvls/TdsCategory/values");
        case 10:
          cvlResponse = _context.sent;
          console.log(cvlResponse);

          // Find the matching CVL entry
          cvlValues = cvlResponse.data;
          matchingCvl = cvlValues.find(function (cvl) {
            return cvl.value === productTdsCategoryValue;
          });
          if (matchingCvl) {
            setCurrentCategory(matchingCvl.key); // Set the current category to the matching key
            console.log("Current category set to: ".concat(matchingCvl.key));
          } else {
            console.warn('No matching CVL found for ProductTdsCategory value');
          }
          _context.next = 18;
          break;
        case 17:
          console.warn('ProductTdsCategory not found in field values');
        case 18:
          _context.next = 23;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching ProductTdsCategory or CVL values:', _context.t0);
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  })), [data]);

  // Fetch the category before any other actions
  (0,react.useEffect)(function () {
    fetchProductTdsCategory();
  }, [fetchProductTdsCategory]);

  // Check if the current category is valid
  var checkCategoryValidity = (0,react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var response, validCategories;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return product_apiClient.get('/configuration/categories');
        case 3:
          response = _context2.sent;
          validCategories = response.data.map(function (category) {
            return category.identifier;
          });
          setIsCategoryValid(validCategories.includes(currentCategory));
          _context2.next = 12;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error('Error checking category validity:', _context2.t0);
          setIsCategoryValid(false); // Default to false if there's an error
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  })), [currentCategory]);

  // Fetch other data when the application loads after category is fetched
  (0,react.useEffect)(function () {
    if (currentCategory) {
      checkCategoryValidity();
    }
  }, [checkCategoryValidity, currentCategory]);

  // Other existing effects for fetching data...
  (0,react.useEffect)(function () {
    fetchAllMarkets();
    fetchJobsForAllMarkets();
    fetchVersions();
    fetchTodaysPreviews();
    var interval = setInterval(function () {
      fetchJobsForAllMarkets();
      fetchVersions();
      fetchTodaysPreviews();
    }, 5000); // Poll every 5 seconds

    return function () {
      clearInterval(interval);
    };
  }, [fetchAllMarkets, fetchJobsForAllMarkets, fetchVersions, fetchTodaysPreviews]);
  var handleRender = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var isPreview,
        type,
        endpoint,
        inriverExtensionEndpoint,
        payload,
        payloadString,
        _args3 = arguments;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            isPreview = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
            _context3.prev = 1;
            // Determine the type based on whether it's a preview or a full render
            type = isPreview ? 'preview' : 'master'; // Check if a market is selected
            if (selectedMarket) {
              _context3.next = 6;
              break;
            }
            showNotification('Please select a market', 'error');
            return _context3.abrupt("return");
          case 6:
            // Construct the endpoint URL for the main API
            endpoint = "/job/register/".concat(selectedMarket, "/").concat(type, "/").concat(itemId); // For the main API, send JSON with appropriate headers
            _context3.next = 9;
            return product_apiClient.post(endpoint, payload, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
          case 9:
            console.log("Sending request to Job API");
            _context3.next = 12;
            return delay(1000);
          case 12:
            // Construct the endpoint URL for the inriverextension
            inriverExtensionEndpoint = "/BonaTdsConductor"; // Create the TdsRequest object as a payload
            payload = {
              EntityId: itemId,
              Market: selectedMarket,
              Category: currentCategory,
              Type: type
            }; // Convert the payload to a string since server expects `text/plain`
            payloadString = JSON.stringify(payload); // Send POST request to the inriverExtensionEndpoint with the serialized payload
            _context3.next = 17;
            return product_inboundExtensionClient.post(inriverExtensionEndpoint, payloadString);
          case 17:
            console.log("Sending request to inRiver");

            // Show a success notification
            showNotification(isPreview ? 'Preview job created' : 'Render job created', 'success');
            _context3.next = 25;
            break;
          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](1);
            // Handle errors
            console.error('Error creating render job:', _context3.t0);
            showNotification('Error creating render job', 'error');
          case 25:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 21]]);
    }));
    return function handleRender() {
      return _ref3.apply(this, arguments);
    };
  }();

  // Fetch all unique markets
  var fetchAllMarkets = (0,react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return product_apiClient.get('/configuration/markets/unique');
        case 3:
          response = _context4.sent;
          setMarkets(response.data);
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error('Error fetching all markets:', _context4.t0);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  })), []);
  var fetchVersions = (0,react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var response, sortedVersions;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return product_apiClient.get("/configuration/items/".concat(itemId, "/versionHistory"));
        case 3:
          response = _context5.sent;
          sortedVersions = response.data.sort(function (a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
          setVersions(sortedVersions);
          fetchTodaysVersions(sortedVersions);
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.error('Error fetching item versions:', _context5.t0);
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  })), [itemId]);

  // Modified fetchTodaysVersions function to maintain sorting
  var fetchTodaysVersions = (0,react.useCallback)(function () {
    var versionsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : versions;
    var today = new Date().toISOString().slice(0, 10);
    var filteredVersions = versionsData.filter(function (version) {
      return version.timestamp.startsWith(today);
    });
    setTodaysVersions(filteredVersions);
  }, [versions]);

  // Fetch today's previews
  var fetchTodaysPreviews = (0,react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var response, files, today, todaysFiles;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return product_apiClient.get("/configuration/items/".concat(itemId, "/files?isPreview=true"));
        case 3:
          response = _context6.sent;
          files = response.data;
          today = new Date().toISOString().slice(0, 10);
          todaysFiles = files.filter(function (file) {
            return new Date(file.lastModified).toISOString().startsWith(today);
          }).sort(function (a, b) {
            return new Date(b.lastModified) - new Date(a.lastModified);
          });
          setTodaysPreviews(todaysFiles);
          _context6.next = 13;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error('Error fetching todays previews:', _context6.t0);
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  })), [itemId]);

  // // Check if the current category is valid
  // const checkCategoryValidity = useCallback(async () => {
  //   try {
  //     const response = await apiClient.get('/configuration/categories');
  //     const validCategories = response.data.map((category) => category.identifier);
  //     setIsCategoryValid(validCategories.includes(currentCategory));
  //   } catch (error) {
  //     console.error('Error checking category validity:', error);
  //     setIsCategoryValid(false); // Default to false if there's an error
  //   }
  // }, [currentCategory]);

  // Fetch jobs for all markets using a single endpoint
  var fetchJobsForAllMarkets = (0,react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var response, jobsData, today, todaysJobs;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return product_apiClient.get("/jobs/".concat(itemId));
        case 3:
          response = _context7.sent;
          jobsData = response.data; // Filter jobs from today
          today = new Date().toISOString().slice(0, 10);
          todaysJobs = jobsData.filter(function (job) {
            return job.timestamp.startsWith(today);
          });
          setJobs(todaysJobs);
          _context7.next = 13;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error('Error fetching jobs:', _context7.t0);
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  })), [itemId]);

  // Fetch data when the application loads
  (0,react.useEffect)(function () {
    fetchAllMarkets();
    checkCategoryValidity();
    fetchJobsForAllMarkets(); // Fetch queues immediately on load
    fetchVersions();
    fetchTodaysPreviews();

    // Set up polling for jobs, versions, and previews
    var interval = setInterval(function () {
      fetchJobsForAllMarkets(); // Poll jobs
      fetchVersions(); // Poll versions
      fetchTodaysPreviews(); // Poll previews
    }, 5000); // Poll every 5 seconds

    // Clean up intervals on component unmount or change
    return function () {
      clearInterval(interval);
    };
  }, [fetchAllMarkets, checkCategoryValidity, fetchJobsForAllMarkets, fetchVersions, fetchTodaysPreviews]);

  // Handle clicking on sidebar items
  var handleItemClick = function handleItemClick(item) {
    setSelectedItem(item);
  };

  // Toggle the expanded state of a market
  var toggleMarket = function toggleMarket(market) {
    setExpandedMarkets(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, market, !prev[market]));
    });
  };

  // Group versions by market
  var groupedVersions = versions.reduce(function (acc, version) {
    var market = version.market;
    if (!acc[market]) acc[market] = [];
    acc[market].push(version);
    return acc;
  }, {});

  // // Check if category validity is still loading
  // if (isCategoryValid === null) {
  //   return <p>Loading...</p>;
  // }

  // // Display message if category is not valid
  // if (!isCategoryValid) {
  //   return (
  //     <div className="centered-error">
  //       The current category for this product is not supported.
  //     </div>
  //   );
  // }

  // Render job status icon based on job status with pulsing effect
  var renderJobStatusIcon = function renderJobStatusIcon(status) {
    switch (status) {
      case 'Processing':
        return /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
          icon: free_solid_svg_icons/* faCircle */.GEE,
          className: "pulse-green"
        });
      // Green dot with pulse
      case 'Completed':
        return /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
          icon: free_solid_svg_icons/* faCircle */.GEE,
          className: "text-green-500"
        });
      // Static green dot
      case 'Registered':
        return /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
          icon: free_solid_svg_icons/* faCircle */.GEE,
          className: "text-gray-500"
        });
      // Static grey dot
      case 'Queued':
        return /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
          icon: free_solid_svg_icons/* faCircle */.GEE,
          className: "pulse-blue"
        });
      // Blue dot with pulse
      case 'Failed':
        return /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
          icon: free_solid_svg_icons/* faCircle */.GEE,
          className: "text-red-500"
        });
      // Static red dot
      default:
        return /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
          icon: free_solid_svg_icons/* faCircle */.GEE,
          className: "text-gray-500"
        });
      // Static grey dot
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "App"
  }, /*#__PURE__*/react.createElement("div", {
    className: "container mx-auto p-4 grid grid-cols-12 gap-4"
  }, notification.message && /*#__PURE__*/react.createElement("div", {
    className: "fixed top-4 right-4 p-4 rounded shadow-lg flex items-center ".concat(notification.type === 'success' ? 'bg-green-500 text-white' : notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white')
  }, /*#__PURE__*/react.createElement("span", null, notification.message)), /*#__PURE__*/react.createElement("div", {
    className: "bg-white shadow-md rounded-lg p-4 col-span-2"
  }, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Menu"), /*#__PURE__*/react.createElement("ul", {
    className: "space-y-2"
  }, ['Create TDS', 'Changes', 'Versions', 'Settings'].map(function (item) {
    return /*#__PURE__*/react.createElement("li", {
      key: item,
      onClick: function onClick() {
        return handleItemClick(item);
      },
      className: "cursor-pointer p-2 rounded ".concat(selectedItem === item ? 'bg-blue-500 text-white' : 'hover:bg-gray-100')
    }, item);
  }))), /*#__PURE__*/react.createElement("div", {
    className: "bg-white shadow-md rounded-lg p-4 col-span-10"
  }, selectedItem === 'Create TDS' && /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Create TDS"), /*#__PURE__*/react.createElement("button", {
    className: "bg-green-500 text-white px-4 py-2 rounded mr-2",
    onClick: function onClick() {
      return handleRender(false);
    } // Calls handleRender with false for rendering
    ,
    disabled: !selectedMarket // Disable if no market is selected
  }, "Render new TDS"), /*#__PURE__*/react.createElement("button", {
    className: "bg-blue-500 text-white px-4 py-2 rounded",
    onClick: function onClick() {
      return handleRender(true);
    } // Calls handleRender with true for previewing
    ,
    disabled: !selectedMarket // Disable if no market is selected
  }, "Preview new TDS"), /*#__PURE__*/react.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Select Market"), /*#__PURE__*/react.createElement("select", {
    className: "border border-gray-300 rounded p-2 w-full",
    onChange: function onChange(e) {
      return setSelectedMarket(e.target.value);
    },
    value: selectedMarket
  }, /*#__PURE__*/react.createElement("option", {
    value: ""
  }, "Select a Market"), markets.map(function (market) {
    return /*#__PURE__*/react.createElement("option", {
      key: market.identifier,
      value: market.identifier
    }, market.name, " (", market.identifier, ")");
  }))), /*#__PURE__*/react.createElement("hr", {
    className: "my-4"
  }), /*#__PURE__*/react.createElement("h3", {
    className: "text-md font-semibold mb-2"
  }, "Queue"), /*#__PURE__*/react.createElement("table", {
    className: "min-w-full divide-y divide-gray-200 mt-2"
  }, /*#__PURE__*/react.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/react.createElement("tr", null, /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Market"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Job Type"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Status"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Timestamp"))), /*#__PURE__*/react.createElement("tbody", {
    className: "bg-white divide-y divide-gray-200"
  }, jobs.map(function (job, index) {
    return /*#__PURE__*/react.createElement("tr", {
      key: index
    }, /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, "".concat(job.market, " (").concat(job.marketId, ")")), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, job.type), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, renderJobStatusIcon(job.status)), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, new Date(job.timestamp).toLocaleString()));
  }))), /*#__PURE__*/react.createElement("hr", {
    className: "my-4"
  }), /*#__PURE__*/react.createElement("h3", {
    className: "text-md font-semibold mb-2"
  }, "Versions"), /*#__PURE__*/react.createElement("table", {
    className: "min-w-full divide-y divide-gray-200 mt-2"
  }, /*#__PURE__*/react.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/react.createElement("tr", null, /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "File Name"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Market"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Timestamp"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Download"))), /*#__PURE__*/react.createElement("tbody", {
    className: "bg-white divide-y divide-gray-200"
  }, todaysVersions.map(function (version) {
    return /*#__PURE__*/react.createElement("tr", {
      key: "".concat(version.fileName).concat(version.rowKey)
    }, /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, version.rowKey), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, version.market), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, new Date(version.timestamp).toLocaleString()), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/react.createElement("a", {
      href: version.uri,
      className: "text-blue-500",
      download: true
    }, "Download")));
  }))), /*#__PURE__*/react.createElement("hr", {
    className: "my-4"
  }), /*#__PURE__*/react.createElement("h3", {
    className: "text-md font-semibold mb-2"
  }, "Previews"), /*#__PURE__*/react.createElement("table", {
    className: "min-w-full divide-y divide-gray-200 mt-2"
  }, /*#__PURE__*/react.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/react.createElement("tr", null, /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "File Name"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Timestamp"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Download"))), /*#__PURE__*/react.createElement("tbody", {
    className: "bg-white divide-y divide-gray-200"
  }, todaysPreviews.map(function (preview) {
    return /*#__PURE__*/react.createElement("tr", {
      key: "".concat(preview.fileName).concat(preview.rowKey)
    }, /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, preview.fileName), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, new Date(preview.lastModified).toLocaleString()), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/react.createElement("a", {
      href: preview.filePath,
      className: "text-blue-500",
      download: true
    }, "Download")));
  })))), selectedItem === 'Changes' && /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Changes"), /*#__PURE__*/react.createElement("p", null, "Content will be added here in the future.")), selectedItem === 'Versions' && /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Versions"), Object.entries(groupedVersions).map(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      market = _ref9[0],
      versions = _ref9[1];
    return /*#__PURE__*/react.createElement("div", {
      key: market,
      className: "mb-4"
    }, /*#__PURE__*/react.createElement("div", {
      className: "flex items-center justify-between cursor-pointer p-2 bg-gray-100 rounded",
      onClick: function onClick() {
        return toggleMarket(market);
      }
    }, /*#__PURE__*/react.createElement("h3", {
      className: "text-md font-semibold"
    }, market, " (", versions.length, ")"), /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
      icon: expandedMarkets[market] ? free_solid_svg_icons/* faChevronDown */.Jt$ : free_solid_svg_icons/* faChevronRight */.XkK
    })), expandedMarkets[market] && /*#__PURE__*/react.createElement("table", {
      className: "min-w-full divide-y divide-gray-200 mt-2"
    }, /*#__PURE__*/react.createElement("thead", {
      className: "bg-gray-50"
    }, /*#__PURE__*/react.createElement("tr", null, /*#__PURE__*/react.createElement("th", {
      className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    }, "File Name"), /*#__PURE__*/react.createElement("th", {
      className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    }, "Market"), /*#__PURE__*/react.createElement("th", {
      className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    }, "Timestamp"), /*#__PURE__*/react.createElement("th", {
      className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    }, "Download"))), /*#__PURE__*/react.createElement("tbody", {
      className: "bg-white divide-y divide-gray-200"
    }, versions.map(function (version) {
      return /*#__PURE__*/react.createElement("tr", {
        key: "".concat(version.fileName).concat(version.rowKey)
      }, /*#__PURE__*/react.createElement("td", {
        className: "px-6 py-4 whitespace-nowrap"
      }, version.rowKey), /*#__PURE__*/react.createElement("td", {
        className: "px-6 py-4 whitespace-nowrap"
      }, version.market), /*#__PURE__*/react.createElement("td", {
        className: "px-6 py-4 whitespace-nowrap"
      }, new Date(version.timestamp).toLocaleString()), /*#__PURE__*/react.createElement("td", {
        className: "px-6 py-4 whitespace-nowrap"
      }, /*#__PURE__*/react.createElement("a", {
        href: version.uri,
        className: "text-blue-500",
        download: true
      }, "Download")));
    }))));
  })), selectedItem === 'Settings' && /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Settings"), /*#__PURE__*/react.createElement("p", null, "Settings content will go here.")))));
};
/* harmony default export */ const product_App = (App);
;// CONCATENATED MODULE: ./src/product/reportWebVitals.js
var reportWebVitals = function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    __webpack_require__.e(/* import() */ 364).then(__webpack_require__.bind(__webpack_require__, 364)).then(function (_ref) {
      var getCLS = _ref.getCLS,
        getFID = _ref.getFID,
        getFCP = _ref.getFCP,
        getLCP = _ref.getLCP,
        getTTFB = _ref.getTTFB;
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
/* harmony default export */ const product_reportWebVitals = (reportWebVitals);
;// CONCATENATED MODULE: ./src/product/index.js





var root = client.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/react.createElement(react.StrictMode, null, /*#__PURE__*/react.createElement(product_App, null)));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
product_reportWebVitals();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "/bundle.asset.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "three-panes-navigation:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			964: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkthree_panes_navigation"] = self["webpackChunkthree_panes_navigation"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [391,265], () => (__webpack_require__(9929)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.asset.js.map