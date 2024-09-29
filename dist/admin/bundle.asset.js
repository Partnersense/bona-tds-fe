/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 724:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(5338);
// EXTERNAL MODULE: ./node_modules/react-datepicker/dist/react-datepicker.min.js
var react_datepicker_min = __webpack_require__(9386);
var react_datepicker_min_default = /*#__PURE__*/__webpack_require__.n(react_datepicker_min);
// EXTERNAL MODULE: ./node_modules/react-datepicker/dist/react-datepicker.css
var react_datepicker = __webpack_require__(2612);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var axios = __webpack_require__(1083);
;// CONCATENATED MODULE: ./src/admin/apiClient.js


// Configure Axios instance
var apiClient = axios/* default */.A.create({
  baseURL: 'https://bona-tds-webapp.azurewebsites.net/api',
  // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '843cc8c8-9f05-4ebc-8901-bbc598282eca' // Replace with your actual API key
  }
});
/* harmony default export */ const admin_apiClient = (apiClient);
// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.es.js + 1 modules
var index_es = __webpack_require__(982);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var free_solid_svg_icons = __webpack_require__(6188);
// EXTERNAL MODULE: ./node_modules/lodash.debounce/index.js
var lodash_debounce = __webpack_require__(181);
var lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(lodash_debounce);
;// CONCATENATED MODULE: ./src/admin/App.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







 // Install lodash.debounce or use a custom debounce function

var App = function App() {
  // State Definitions
  var _useState = (0,react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    categories = _useState2[0],
    setCategories = _useState2[1];
  var _useState3 = (0,react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    markets = _useState4[0],
    setMarkets = _useState4[1];
  var _useState5 = (0,react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    history = _useState6[0],
    setHistory = _useState6[1];
  var _useState7 = (0,react.useState)('none'),
    _useState8 = _slicedToArray(_useState7, 2),
    activeView = _useState8[0],
    setActiveView = _useState8[1];
  var _useState9 = (0,react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    selectedTab = _useState10[0],
    setSelectedTab = _useState10[1];
  var _useState11 = (0,react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedCategory = _useState12[0],
    setSelectedCategory = _useState12[1];
  var _useState13 = (0,react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedMarket = _useState14[0],
    setSelectedMarket = _useState14[1];
  var _useState15 = (0,react.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    templateLayoutText = _useState16[0],
    setTemplateLayoutText = _useState16[1];
  var _useState17 = (0,react.useState)(''),
    _useState18 = _slicedToArray(_useState17, 2),
    templateStylingText = _useState18[0],
    setTemplateStylingText = _useState18[1];
  var _useState19 = (0,react.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    autoRegenerate = _useState20[0],
    setAutoRegenerate = _useState20[1];
  var _useState21 = (0,react.useState)([]),
    _useState22 = _slicedToArray(_useState21, 2),
    translations = _useState22[0],
    setTranslations = _useState22[1];
  var _useState23 = (0,react.useState)(null),
    _useState24 = _slicedToArray(_useState23, 2),
    editingTranslationIndex = _useState24[0],
    setEditingTranslationIndex = _useState24[1];
  var _useState25 = (0,react.useState)(''),
    _useState26 = _slicedToArray(_useState25, 2),
    newTranslationKey = _useState26[0],
    setNewTranslationKey = _useState26[1];
  var _useState27 = (0,react.useState)(''),
    _useState28 = _slicedToArray(_useState27, 2),
    newTranslationValue = _useState28[0],
    setNewTranslationValue = _useState28[1];
  var _useState29 = (0,react.useState)(null),
    _useState30 = _slicedToArray(_useState29, 2),
    editingMarketIndex = _useState30[0],
    setEditingMarketIndex = _useState30[1];
  var _useState31 = (0,react.useState)(''),
    _useState32 = _slicedToArray(_useState31, 2),
    newMarketName = _useState32[0],
    setNewMarketName = _useState32[1];
  var _useState33 = (0,react.useState)(''),
    _useState34 = _slicedToArray(_useState33, 2),
    newMarketIdentifier = _useState34[0],
    setNewMarketIdentifier = _useState34[1];
  var _useState35 = (0,react.useState)(false),
    _useState36 = _slicedToArray(_useState35, 2),
    loading = _useState36[0],
    setLoading = _useState36[1];
  var _useState37 = (0,react.useState)({
      message: '',
      type: ''
    }),
    _useState38 = _slicedToArray(_useState37, 2),
    notification = _useState38[0],
    setNotification = _useState38[1];
  var _useState39 = (0,react.useState)(1),
    _useState40 = _slicedToArray(_useState39, 2),
    currentPage = _useState40[0],
    setCurrentPage = _useState40[1];
  var _useState41 = (0,react.useState)(10),
    _useState42 = _slicedToArray(_useState41, 2),
    itemsPerPage = _useState42[0],
    setItemsPerPage = _useState42[1];
  var _useState43 = (0,react.useState)(''),
    _useState44 = _slicedToArray(_useState43, 2),
    payloadFilter = _useState44[0],
    setPayloadFilter = _useState44[1];
  var _useState45 = (0,react.useState)(null),
    _useState46 = _slicedToArray(_useState45, 2),
    continuationToken = _useState46[0],
    setContinuationToken = _useState46[1];
  var _useState47 = (0,react.useState)([]),
    _useState48 = _slicedToArray(_useState47, 2),
    prevContinuationTokens = _useState48[0],
    setPrevContinuationTokens = _useState48[1];
  var _useState49 = (0,react.useState)(new Date()),
    _useState50 = _slicedToArray(_useState49, 2),
    startDate = _useState50[0],
    setStartDate = _useState50[1];
  var _useState51 = (0,react.useState)(new Date()),
    _useState52 = _slicedToArray(_useState51, 2),
    endDate = _useState52[0],
    setEndDate = _useState52[1];
  var _useState53 = (0,react.useState)('All'),
    _useState54 = _slicedToArray(_useState53, 2),
    status = _useState54[0],
    setStatus = _useState54[1];
  var _useState55 = (0,react.useState)(0),
    _useState56 = _slicedToArray(_useState55, 2),
    generalSettingsTab = _useState56[0],
    setGeneralSettingsTab = _useState56[1];
  var _useState57 = (0,react.useState)(''),
    _useState58 = _slicedToArray(_useState57, 2),
    newCategoryName = _useState58[0],
    setNewCategoryName = _useState58[1];
  var _useState59 = (0,react.useState)(''),
    _useState60 = _slicedToArray(_useState59, 2),
    newCategoryIdentifier = _useState60[0],
    setNewCategoryIdentifier = _useState60[1];
  var _useState61 = (0,react.useState)(null),
    _useState62 = _slicedToArray(_useState61, 2),
    editingCategoryIndex = _useState62[0],
    setEditingCategoryIndex = _useState62[1];
  var _useState63 = (0,react.useState)(false),
    _useState64 = _slicedToArray(_useState63, 2),
    addingTranslation = _useState64[0],
    setAddingTranslation = _useState64[1];
  var _useState65 = (0,react.useState)([]),
    _useState66 = _slicedToArray(_useState65, 2),
    AllMarkets = _useState66[0],
    setAllMarkets = _useState66[1];

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

  // Function to handle translation updates
  var handleEditTranslation = function handleEditTranslation(index) {
    setEditingTranslationIndex(index);
    setNewTranslationKey(translations[index].Key);
    setNewTranslationValue(translations[index].Value);
  };

  // Function to save translation updates
  var handleSaveTranslation = function handleSaveTranslation(index) {
    if (!newTranslationKey.trim()) {
      showNotification('Translation Key cannot be empty', 'error');
      return;
    }

    // Check for unique key
    var isDuplicateKey = translations.some(function (translation, idx) {
      return translation.Key === newTranslationKey && idx !== index;
    });
    if (isDuplicateKey) {
      showNotification('Translation Key must be unique', 'error');
      return;
    }
    var updatedTranslations = _toConsumableArray(translations);
    updatedTranslations[index] = {
      Key: newTranslationKey,
      Value: newTranslationValue
    };
    setTranslations(updatedTranslations);
    setEditingTranslationIndex(null);
    showNotification('Translation updated successfully', 'success');
  };

  // Function to delete a translation
  var handleDeleteTranslation = function handleDeleteTranslation(index) {
    var updatedTranslations = _toConsumableArray(translations);
    updatedTranslations.splice(index, 1);
    setTranslations(updatedTranslations);
    showNotification('Translation deleted successfully', 'success');
  };

  // Function to add a new translation
  var addTranslation = function addTranslation() {
    if (!newTranslationKey.trim() || !newTranslationValue.trim()) {
      showNotification('Both key and value are required', 'error');
      return;
    }

    // Check for unique key
    var isDuplicateKey = translations.some(function (translation) {
      return translation.Key === newTranslationKey;
    });
    if (isDuplicateKey) {
      showNotification('Translation Key must be unique', 'error');
      return;
    }
    setTranslations([].concat(_toConsumableArray(translations), [{
      Key: newTranslationKey,
      Value: newTranslationValue
    }]));
    setNewTranslationKey('');
    setNewTranslationValue('');
    setAddingTranslation(false);
    showNotification('Translation added successfully', 'success');
  };

  // Function to cancel adding a translation
  var cancelAddTranslation = function cancelAddTranslation() {
    setAddingTranslation(false);
    setNewTranslationKey('');
    setNewTranslationValue('');
  };

  // Function to handle category updates
  var handleEditCategory = function handleEditCategory(index) {
    setEditingCategoryIndex(index);
    setNewCategoryName(categories[index].name);
    setNewCategoryIdentifier(categories[index].identifier);
  };

  // Function to save category updates
  var handleSaveCategory = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(index) {
      var updatedCategory;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            updatedCategory = _objectSpread(_objectSpread({}, categories[index]), {}, {
              Name: newCategoryName,
              Identifier: newCategoryIdentifier
            });
            _context.prev = 1;
            _context.next = 4;
            return admin_apiClient.put('/configuration/categories', updatedCategory);
          case 4:
            showNotification('Category updated successfully', 'success');
            fetchCategories(); // Refresh categories after update
            _context.next = 12;
            break;
          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.error('Error updating category:', _context.t0);
            showNotification('Error updating category', 'error');
          case 12:
            setEditingCategoryIndex(null); // Reset editing state
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 8]]);
    }));
    return function handleSaveCategory(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // Function to delete a category
  var handleDeleteCategory = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(index) {
      var categoryId;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            categoryId = categories[index].identifier;
            _context2.prev = 1;
            _context2.next = 4;
            return admin_apiClient["delete"]("/configuration/categories/".concat(categoryId));
          case 4:
            showNotification('Category deleted successfully', 'success');
            fetchCategories(); // Refresh categories after deletion
            _context2.next = 12;
            break;
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.error('Error deleting category:', _context2.t0);
            showNotification('Error deleting category', 'error');
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 8]]);
    }));
    return function handleDeleteCategory(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Function to add a new translation
  var handleAddTranslation = function handleAddTranslation() {
    if (!newTranslationKey.trim()) {
      showNotification('Translation Key cannot be empty', 'error');
      return;
    }

    // Check for unique key
    var isDuplicateKey = translations.some(function (translation) {
      return translation.Key === newTranslationKey;
    });
    if (isDuplicateKey) {
      showNotification('Translation Key must be unique', 'error');
      return;
    }
    setTranslations([].concat(_toConsumableArray(translations), [{
      Key: newTranslationKey,
      Value: newTranslationValue
    }]));
    setEditingTranslationIndex(translations.length);
    showNotification('Translation added successfully', 'success');
  };

  // Function to handle input change and auto-save
  var handleTranslationChange = function handleTranslationChange(index, field, value) {
    var updatedTranslations = _toConsumableArray(translations);
    updatedTranslations[index][field] = value;
    setTranslations(updatedTranslations);
  };

  // Debounced save function to update translations state
  var debouncedHandleTranslationChange = lodash_debounce_default()(handleTranslationChange, 10);

  // Function to handle market updates
  var handleEditMarket = function handleEditMarket(index) {
    setEditingMarketIndex(index);
    setNewMarketName(markets[index].name);
    setNewMarketIdentifier(markets[index].identifier);
  };

  // Function to fetch categories from API
  var fetchCategories = (0,react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          setLoading(true);
          _context3.prev = 1;
          _context3.next = 4;
          return admin_apiClient.get('/configuration/categories');
        case 4:
          response = _context3.sent;
          setCategories(response.data);
          _context3.next = 12;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error('Error fetching categories:', _context3.t0);
          showNotification('Error fetching categories', 'error');
        case 12:
          _context3.prev = 12;
          setLoading(false);
          return _context3.finish(12);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8, 12, 15]]);
  })), []);

  // Fetch all markets once on component mount
  var fetchAllMarkets = (0,react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          setLoading(true);
          _context4.prev = 1;
          _context4.next = 4;
          return admin_apiClient.get('/configuration/markets/unique');
        case 4:
          response = _context4.sent;
          setAllMarkets(response.data);

          // Log all markets to the console
          console.log('Fetched Markets:', response.data);
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          console.error('Error fetching all markets:', _context4.t0);
        case 12:
          _context4.prev = 12;
          setLoading(false);
          return _context4.finish(12);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 9, 12, 15]]);
  })), []);

  // Update a market and sync changes to both collections
  var updateMarket = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(updatedMarket) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return admin_apiClient.put("/configuration/markets/".concat(updatedMarket.identifier), updatedMarket);
          case 3:
            setAllMarkets(function (prev) {
              return prev.map(function (market) {
                return market.Identifier === updatedMarket.identifier ? updatedMarket : market;
              });
            });
            setMarkets(function (prev) {
              return prev.map(function (market) {
                return market.Identifier === updatedMarket.identifier ? updatedMarket : market;
              });
            });
            _context5.next = 10;
            break;
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.error('Error updating market:', _context5.t0);
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 7]]);
    }));
    return function updateMarket(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  // Delete a market from both collections
  var deleteMarket = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(marketId) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return admin_apiClient["delete"]("/configuration/markets/".concat(marketId));
          case 3:
            setAllMarkets(function (prev) {
              return prev.filter(function (market) {
                return market.identifier !== marketId;
              });
            });
            setMarkets(function (prev) {
              return prev.filter(function (market) {
                return market.identifier !== marketId;
              });
            });
            _context6.next = 10;
            break;
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.error('Error deleting market:', _context6.t0);
          case 10:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 7]]);
    }));
    return function deleteMarket(_x4) {
      return _ref6.apply(this, arguments);
    };
  }();

  // Fetch markets based on selected category
  var fetchMarkets = (0,react.useCallback)(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(categoryIdentifier) {
      var response;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            if (categoryIdentifier) {
              _context7.next = 3;
              break;
            }
            setMarkets(AllMarkets); // If no category, show all markets
            return _context7.abrupt("return");
          case 3:
            setLoading(true);
            _context7.prev = 4;
            _context7.next = 7;
            return admin_apiClient.get("/configuration/categories/".concat(categoryIdentifier, "/markets"));
          case 7:
            response = _context7.sent;
            setMarkets(response.data);
            _context7.next = 14;
            break;
          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](4);
            console.error('Error fetching markets by category:', _context7.t0);
          case 14:
            _context7.prev = 14;
            setLoading(false);
            return _context7.finish(14);
          case 17:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[4, 11, 14, 17]]);
    }));
    return function (_x5) {
      return _ref7.apply(this, arguments);
    };
  }(), [AllMarkets]);

  // Function to fetch history with applied filters
  var fetchHistory = (0,react.useCallback)(/*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(statusFilter, start, end, payloadFilter, pageSize) {
      var params, response;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            setLoading(true);
            _context8.prev = 1;
            params = {
              from: start.toISOString(),
              to: end.toISOString(),
              pageSize: pageSize,
              status: statusFilter !== 'All' ? statusFilter : undefined,
              payload: payloadFilter || undefined
            };
            _context8.next = 5;
            return admin_apiClient.get('/configuration/history', {
              params: params
            });
          case 5:
            response = _context8.sent;
            setHistory(response.data.histories);
            setContinuationToken(response.data.continuationToken || null);
            _context8.next = 14;
            break;
          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            console.error('Error fetching history:', _context8.t0);
            showNotification('Error fetching history', 'error');
          case 14:
            _context8.prev = 14;
            setLoading(false);
            return _context8.finish(14);
          case 17:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[1, 10, 14, 17]]);
    }));
    return function (_x6, _x7, _x8, _x9, _x10) {
      return _ref8.apply(this, arguments);
    };
  }(), []);

  // Function to handle clicking on a category
  var handleCategoryClick = (0,react.useCallback)(function (category) {
    setActiveView('markets');
    setSelectedCategory(category);
    setSelectedMarket(null);
    fetchMarkets(category.rowKey);
  }, [fetchMarkets]);

  // Function to handle clicking on the general settings
  var handleGeneralSettingsClick = function handleGeneralSettingsClick() {
    setActiveView('settings');
    setGeneralSettingsTab(0);
  };

  // Function to handle clicking on a market
  var handleMarketClick = function handleMarketClick(market, index) {
    setSelectedTab(0); // Default to the first tab
    setActiveView('details'); // Switch to details view
    setSelectedMarket(market); // Set the selected market

    // Safely parse settings and translations
    var parsedSettings = {};
    var parsedTranslations = [];
    try {
      if (market.settings && market.settings.trim().startsWith('{')) {
        parsedSettings = JSON.parse(market.settings);
      } else {
        console.warn('Settings is not a valid JSON string:', market.settings);
      }
    } catch (error) {
      console.error('Error parsing settings:', error);
    }
    try {
      if (market.translations && market.translations.trim().startsWith('[')) {
        parsedTranslations = JSON.parse(market.translations);
      } else {
        console.warn('Translations is not a valid JSON string:', market.translations);
      }
    } catch (error) {
      console.error('Error parsing translations:', error);
    }
    setTemplateLayoutText(market.templateLayout || '');
    setTemplateStylingText(market.styling || '');
    setTranslations(parsedTranslations);
    setAutoRegenerate(parsedSettings.allowAutoRegeneration || false);
    setNewMarketName(market.name || ''); // Set market name
    setNewMarketIdentifier(market.identifier || market.rowKey); // Set market identifier from either input or existing data
    setEditingMarketIndex(index);
  };

  // Function to save market details for a category
  var saveMarketForCategory = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(index) {
      var market, marketName, marketIdentifier, updatedMarket, response, _error$response$data$, identifierError;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            if (!(index === null || index < 0 || index >= markets.length)) {
              _context9.next = 4;
              break;
            }
            console.error('Invalid market index:', index);
            showNotification('An issue occurred while saving the market', 'error');
            return _context9.abrupt("return");
          case 4:
            market = markets[index];
            if (market) {
              _context9.next = 9;
              break;
            }
            showNotification('An issue occurred while saving the market', 'error');
            console.error('Market not found at index:', index);
            return _context9.abrupt("return");
          case 9:
            // Ensure Name and Identifier are provided and not empty
            marketName = newMarketName.trim() || market.name;
            marketIdentifier = market.rowKey;
            if (marketName) {
              _context9.next = 15;
              break;
            }
            console.error('Market Name is missing.');
            showNotification('Market Name is required', 'error');
            return _context9.abrupt("return");
          case 15:
            if (marketIdentifier) {
              _context9.next = 19;
              break;
            }
            console.error('Market Identifier is missing.');
            showNotification('Market Identifier is required', 'error');
            return _context9.abrupt("return");
          case 19:
            // Prepare updated market object
            updatedMarket = {
              partitionKey: (selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.rowKey) || market.partitionKey,
              // Ensure correct category ID is used
              rowKey: marketIdentifier,
              // Use the Identifier as rowKey
              Name: marketName,
              Identifier: marketIdentifier,
              TemplateLayout: templateLayoutText,
              Styling: templateStylingText,
              Translations: JSON.stringify(translations),
              Settings: JSON.stringify({
                allowAutoRegeneration: autoRegenerate
              })
            };
            console.log("Updating market for category ".concat(selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.rowKey, ":"), updatedMarket);
            _context9.prev = 21;
            _context9.next = 24;
            return admin_apiClient.put("/configuration/categories/".concat(selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.rowKey, "/markets/").concat(marketIdentifier), updatedMarket);
          case 24:
            response = _context9.sent;
            console.log('Market updated successfully:', response.data);
            showNotification('Market updated successfully', 'success');

            // Re-fetch markets after successfully saving the market
            _context9.next = 29;
            return fetchMarkets(selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.rowKey);
          case 29:
            // Alternatively, directly update the markets state without re-fetching
            setMarkets(function (prevMarkets) {
              var updatedMarkets = _toConsumableArray(prevMarkets);
              updatedMarkets[index] = _objectSpread(_objectSpread({}, market), updatedMarket);
              setSelectedMarket(updatedMarkets[index]);
              return updatedMarkets;
            });
            _context9.next = 36;
            break;
          case 32:
            _context9.prev = 32;
            _context9.t0 = _context9["catch"](21);
            console.error('Error updating market:', _context9.t0.message);

            // Check for server validation errors
            if (_context9.t0.response && _context9.t0.response.data.errors) {
              console.error('Error details:', _context9.t0.response.data.errors);
              identifierError = (_error$response$data$ = _context9.t0.response.data.errors.Identifier) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$[0];
              if (identifierError) {
                showNotification(identifierError, 'error');
              }
            } else {
              showNotification('An issue occurred while updating the market', 'error');
            }
          case 36:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[21, 32]]);
    }));
    return function saveMarketForCategory(_x11) {
      return _ref9.apply(this, arguments);
    };
  }();
  var handleMarketsTabClick = function handleMarketsTabClick() {
    setActiveView('markets');
    setGeneralSettingsTab(5);
    setEditingMarketIndex(null); // Reset the editing state
  };
  (0,react.useEffect)(function () {
    // Reset editing state when changing to the Markets tab
    if (generalSettingsTab === 5) {
      setEditingMarketIndex(null);
    }
  }, [generalSettingsTab]);

  // Function to add a new category with unique identifier check
  var addCategory = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var newCategory;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            if (!(!newCategoryName || !newCategoryIdentifier)) {
              _context10.next = 3;
              break;
            }
            showNotification('Both name and identifier are required', 'error');
            return _context10.abrupt("return");
          case 3:
            if (!categories.some(function (cat) {
              return cat.rowKey === newCategoryIdentifier;
            })) {
              _context10.next = 6;
              break;
            }
            showNotification('Identifier must be unique', 'error');
            return _context10.abrupt("return");
          case 6:
            newCategory = {
              partitionKey: 'CategoryPartition',
              // or whatever your partition key is
              Identifier: newCategoryIdentifier,
              rowKey: newCategoryIdentifier,
              Name: newCategoryName
            };
            _context10.prev = 7;
            _context10.next = 10;
            return admin_apiClient.post('/configuration/categories', newCategory);
          case 10:
            showNotification('Category added successfully', 'success');
            fetchCategories(); // Refresh the categories list
            _context10.next = 18;
            break;
          case 14:
            _context10.prev = 14;
            _context10.t0 = _context10["catch"](7);
            console.error('Error adding category:', _context10.t0);
            showNotification('An issue occurred while adding the category', 'error');
          case 18:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[7, 14]]);
    }));
    return function addCategory() {
      return _ref10.apply(this, arguments);
    };
  }();

  // Function to add a new market with unique identifier check
  var handleSaveMarket = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(index) {
      var updatedMarket;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            updatedMarket = _objectSpread(_objectSpread({}, markets[index]), {}, {
              Name: newMarketName,
              Identifier: newMarketIdentifier
            });
            _context11.prev = 1;
            _context11.next = 4;
            return admin_apiClient.put("/configuration/categories/".concat(selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.rowKey, "/markets/").concat(updatedMarket.identifier), updatedMarket);
          case 4:
            showNotification('Market updated successfully', 'success');
            fetchAllMarkets(); // Refresh markets after update
            _context11.next = 12;
            break;
          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](1);
            console.error('Error updating market:', _context11.t0);
            showNotification('Error updating market', 'error');
          case 12:
            setEditingMarketIndex(null); // Reset editing state
          case 13:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[1, 8]]);
    }));
    return function handleSaveMarket(_x12) {
      return _ref11.apply(this, arguments);
    };
  }();
  (0,react.useEffect)(function () {
    fetchAllMarkets();
  }, [fetchAllMarkets]);

  // Handle deleting a market by index with validation
  var handleDeleteMarket = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(index) {
      var _targetList$index;
      var fromAllMarkets,
        targetList,
        marketId,
        _args12 = arguments;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            fromAllMarkets = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : false;
            // Determine the list to delete from
            targetList = fromAllMarkets ? AllMarkets : markets; // Check if the index is within the valid range of the selected array
            if (!(index < 0 || index >= targetList.length)) {
              _context12.next = 6;
              break;
            }
            console.error("Invalid market index: ".concat(index));
            console.log('Current target list length:', targetList.length);
            return _context12.abrupt("return");
          case 6:
            // Safely retrieve the market identifier using the valid index
            marketId = (_targetList$index = targetList[index]) === null || _targetList$index === void 0 ? void 0 : _targetList$index.identifier;
            if (marketId) {
              _context12.next = 10;
              break;
            }
            console.error("Market identifier not found at index: ".concat(index));
            return _context12.abrupt("return");
          case 10:
            _context12.prev = 10;
            _context12.next = 13;
            return admin_apiClient["delete"]("/configuration/markets/".concat(marketId));
          case 13:
            showNotification('Market deleted successfully', 'success');
            if (fromAllMarkets) {
              // Update AllMarkets list
              setAllMarkets(function (prev) {
                return prev.filter(function (_, i) {
                  return i !== index;
                });
              });
            } else {
              // Update markets list specific to the current category
              setMarkets(function (prev) {
                return prev.filter(function (_, i) {
                  return i !== index;
                });
              });
            }

            // Optionally re-fetch markets to ensure synchronization
            fetchAllMarkets();
            _context12.next = 22;
            break;
          case 18:
            _context12.prev = 18;
            _context12.t0 = _context12["catch"](10);
            console.error('Error deleting market:', _context12.t0);
            showNotification('Error deleting market', 'error');
          case 22:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[10, 18]]);
    }));
    return function handleDeleteMarket(_x13) {
      return _ref12.apply(this, arguments);
    };
  }();
  var handleAddMarket = function handleAddMarket() {
    var newMarket = {
      Name: newMarketName.trim(),
      Identifier: newMarketIdentifier.trim()
    };
    addMarket(newMarket); // Correctly pass the market data
  };

  // Add a new market and update both collections
  var addMarket = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(newMarket) {
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            console.log('New Market:', newMarket); // Check this output
            _context13.next = 4;
            return admin_apiClient.post('/configuration/markets', newMarket);
          case 4:
            setAllMarkets(function (prev) {
              return [].concat(_toConsumableArray(prev), [newMarket]);
            });
            setMarkets(function (prev) {
              return [].concat(_toConsumableArray(prev), [newMarket]);
            });
            fetchAllMarkets();
            _context13.next = 12;
            break;
          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13["catch"](0);
            console.error('Error adding market:', _context13.t0);
          case 12:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 9]]);
    }));
    return function addMarket(_x14) {
      return _ref13.apply(this, arguments);
    };
  }();
  // Function to toggle the auto-regeneration switch
  var handleToggleSwitch = function handleToggleSwitch() {
    setAutoRegenerate(!autoRegenerate);
  };

  // Fetch categories on component mount
  (0,react.useEffect)(function () {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch history with applied filters
  (0,react.useEffect)(function () {
    fetchHistory(status, startDate, endDate, payloadFilter, itemsPerPage);
  }, [fetchHistory, status, startDate, endDate, payloadFilter, currentPage, itemsPerPage]);
  return /*#__PURE__*/react.createElement("div", {
    className: "App"
  }, /*#__PURE__*/react.createElement("div", {
    className: "container mx-auto p-4 grid grid-cols-12 gap-4"
  }, notification.message && /*#__PURE__*/react.createElement("div", {
    className: "fixed top-4 right-4 p-4 rounded shadow-lg flex items-center ".concat(notification.type === 'success' ? 'bg-green-500 text-white' : notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white' // Default to blue for loading state
    )
  }, /*#__PURE__*/react.createElement("span", null, notification.message), " "), /*#__PURE__*/react.createElement("div", {
    className: "bg-white shadow-md rounded-lg p-4 col-span-2 min-height-800"
  }, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Categories"), /*#__PURE__*/react.createElement("ul", {
    className: "space-y-2"
  }, categories.map(function (category) {
    return /*#__PURE__*/react.createElement("li", {
      key: "".concat(category.partitionKey, "-").concat(category.rowKey),
      onClick: function onClick() {
        return handleCategoryClick(category);
      },
      className: "cursor-pointer p-2 rounded ".concat((selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.rowKey) === category.rowKey ? 'bg-blue-500 text-white' : 'hover:bg-gray-100')
    }, category.name);
  })), /*#__PURE__*/react.createElement("hr", {
    className: "my-4"
  }), /*#__PURE__*/react.createElement("ul", {
    className: "space-y-2"
  }, /*#__PURE__*/react.createElement("li", {
    className: "cursor-pointer p-2 rounded flex items-center ".concat(activeView === 'settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'),
    onClick: handleGeneralSettingsClick
  }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
    icon: free_solid_svg_icons/* faCogs */.Ubc,
    className: "mr-2"
  }), " General Settings"))), loading ? /*#__PURE__*/react.createElement("div", {
    className: "center-spinner col-span-12 min-height-800"
  }, /*#__PURE__*/react.createElement("div", {
    className: "spinner"
  })) : /*#__PURE__*/react.createElement(react.Fragment, null, activeView === 'settings' && /*#__PURE__*/react.createElement("div", {
    className: "bg-white shadow-md rounded-lg p-4 col-span-8 min-height-800"
  }, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "General Settings"), /*#__PURE__*/react.createElement("div", {
    className: "flex space-x-4 mb-4"
  }, /*#__PURE__*/react.createElement("button", {
    onClick: function onClick() {
      return setGeneralSettingsTab(0);
    },
    className: "px-4 py-2 rounded ".concat(generalSettingsTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200')
  }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
    icon: free_solid_svg_icons/* faHistory */.Int,
    className: "mr-2"
  }), "History"), /*#__PURE__*/react.createElement("button", {
    onClick: function onClick() {
      return setGeneralSettingsTab(4);
    },
    className: "px-4 py-2 rounded ".concat(generalSettingsTab === 4 ? 'bg-blue-500 text-white' : 'bg-gray-200')
  }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
    icon: free_solid_svg_icons/* faThList */.s7H,
    className: "mr-2"
  }), "Categories"), /*#__PURE__*/react.createElement("button", {
    onClick: function onClick() {
      setGeneralSettingsTab(5); // Set the active tab to "Markets"
      setEditingMarketIndex(null); // Reset the editing state to null
    },
    className: "px-4 py-2 rounded ".concat(generalSettingsTab === 5 ? 'bg-blue-500 text-white' : 'bg-gray-200')
  }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
    icon: free_solid_svg_icons/* faStore */.H37,
    className: "mr-2"
  }), "Markets")), /*#__PURE__*/react.createElement("div", {
    className: "tab-content"
  }, generalSettingsTab === 0 && /*#__PURE__*/react.createElement("div", {
    className: "history-tab mt-4"
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex items-center mb-4"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/react.createElement("label", {
    className: "block text-sm font-medium"
  }, "Status"), /*#__PURE__*/react.createElement("select", {
    value: status,
    onChange: function onChange(e) {
      return setStatus(e.target.value);
    },
    className: "mt-1 block w-full p-2 border border-gray-300 rounded"
  }, /*#__PURE__*/react.createElement("option", {
    value: "All"
  }, "All"), /*#__PURE__*/react.createElement("option", {
    value: "Error"
  }, "Error"), /*#__PURE__*/react.createElement("option", {
    value: "Warning"
  }, "Warning"), /*#__PURE__*/react.createElement("option", {
    value: "Information"
  }, "Information"))), /*#__PURE__*/react.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react.createElement("label", {
    className: "block text-sm font-medium mr-4"
  }, "Range"), /*#__PURE__*/react.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react.createElement((react_datepicker_min_default()), {
    selected: startDate,
    onChange: function onChange(date) {
      return setStartDate(date);
    },
    selectsStart: true,
    startDate: startDate,
    endDate: endDate,
    showTimeSelect: true,
    dateFormat: "yyyy-MM-dd h:mm aa",
    className: "border border-gray-300 rounded px-2 py-1"
  }), /*#__PURE__*/react.createElement("span", {
    className: "mx-2"
  }, "to"), /*#__PURE__*/react.createElement((react_datepicker_min_default()), {
    selected: endDate,
    onChange: function onChange(date) {
      return setEndDate(date);
    },
    selectsEnd: true,
    startDate: startDate,
    endDate: endDate,
    minDate: startDate,
    showTimeSelect: true,
    dateFormat: "yyyy-MM-dd h:mm aa",
    className: "border border-gray-300 rounded px-2 py-1"
  }))), /*#__PURE__*/react.createElement("button", {
    className: "ml-4 bg-red-500 text-white px-3 py-1 rounded",
    onClick: function onClick() {
      setStatus('All');
      setStartDate(new Date());
      setEndDate(new Date());
      setPayloadFilter('');
    }
  }, "Clear")), /*#__PURE__*/react.createElement("div", {
    className: "flex justify-between items-center mt-4"
  }, /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("label", {
    className: "block text-sm font-medium"
  }, "Filter by Payload"), /*#__PURE__*/react.createElement("input", {
    type: "text",
    value: payloadFilter,
    onChange: function onChange(e) {
      return setPayloadFilter(e.target.value);
    },
    placeholder: "Filter Payload",
    className: "border border-gray-300 rounded p-2"
  })), /*#__PURE__*/react.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/react.createElement("button", {
    className: "px-3 py-1 rounded ".concat(currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'),
    onClick: function onClick() {
      return setCurrentPage(function (prev) {
        return Math.max(prev - 1, 1);
      });
    },
    disabled: currentPage === 1
  }, "Previous"), /*#__PURE__*/react.createElement("span", null, "Page ", currentPage), /*#__PURE__*/react.createElement("button", {
    className: "px-3 py-1 ".concat(continuationToken ? 'bg-blue-500 text-white' : 'bg-gray-300'),
    onClick: function onClick() {
      return setCurrentPage(function (prev) {
        return prev + 1;
      });
    },
    disabled: !continuationToken
  }, "Next")), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("label", {
    className: "block text-sm font-medium"
  }, "Items per page"), /*#__PURE__*/react.createElement("select", {
    value: itemsPerPage,
    onChange: function onChange(e) {
      return setItemsPerPage(parseInt(e.target.value, 10));
    },
    className: "mt-1 block w-full p-2 border border-gray-300 rounded"
  }, /*#__PURE__*/react.createElement("option", {
    value: 5
  }, "5"), /*#__PURE__*/react.createElement("option", {
    value: 10
  }, "10"), /*#__PURE__*/react.createElement("option", {
    value: 20
  }, "20")))), /*#__PURE__*/react.createElement("div", {
    className: "overflow-auto mt-4"
  }, /*#__PURE__*/react.createElement("table", {
    className: "min-w-full divide-y divide-gray-200"
  }, /*#__PURE__*/react.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/react.createElement("tr", null, /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Status"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Payload"), /*#__PURE__*/react.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "DateTime"))), /*#__PURE__*/react.createElement("tbody", {
    className: "bg-white divide-y divide-gray-200"
  }, history.map(function (item) {
    return /*#__PURE__*/react.createElement("tr", {
      key: "".concat(item.partitionKey, "-").concat(item.rowKey)
    }, /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, item.status), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, item.payload), /*#__PURE__*/react.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, new Date(item.timestamp).toLocaleString()));
  }))))), generalSettingsTab === 4 && /*#__PURE__*/react.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react.createElement("h3", {
    className: "text-md font-semibold mb-2"
  }, "Categories"), /*#__PURE__*/react.createElement("div", {
    className: "flex space-x-2 mb-4"
  }, /*#__PURE__*/react.createElement("input", {
    type: "text",
    value: newCategoryName,
    onChange: function onChange(e) {
      return setNewCategoryName(e.target.value);
    },
    placeholder: "Category Name",
    className: "flex-grow border border-gray-300 rounded p-2"
  }), /*#__PURE__*/react.createElement("input", {
    type: "text",
    value: newCategoryIdentifier,
    onChange: function onChange(e) {
      return setNewCategoryIdentifier(e.target.value);
    },
    placeholder: "Identifier",
    className: "flex-grow border border-gray-300 rounded p-2"
  }), /*#__PURE__*/react.createElement("button", {
    className: "bg-blue-500 text-white px-4 py-2 rounded",
    onClick: addCategory
  }, "Add Category")), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("ul", {
    className: "space-y-2"
  }, categories.map(function (category, index) {
    return /*#__PURE__*/react.createElement("li", {
      key: "".concat(category.partitionKey, "-").concat(category.rowKey),
      className: "flex items-center justify-between p-2 border rounded"
    }, editingCategoryIndex === index ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("input", {
      type: "text",
      value: newCategoryName,
      onChange: function onChange(e) {
        return setNewCategoryName(e.target.value);
      },
      className: "border border-gray-300 rounded p-1 flex-grow"
    }), /*#__PURE__*/react.createElement("input", {
      type: "text",
      value: newCategoryIdentifier,
      onChange: function onChange(e) {
        return setNewCategoryIdentifier(e.target.value);
      },
      className: "border border-gray-300 rounded p-1 flex-grow"
    }), /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleSaveCategory(index);
      },
      className: "text-green-500 ml-2"
    }, "Save")) : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("span", null, category.name), /*#__PURE__*/react.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleEditCategory(index);
      },
      className: "text-blue-500"
    }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
      icon: free_solid_svg_icons/* faEdit */.MT7
    })), /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleDeleteCategory(index);
      },
      className: "text-red-500"
    }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
      icon: free_solid_svg_icons/* faTrash */.yLS
    })))));
  })))), generalSettingsTab === 5 && /*#__PURE__*/react.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react.createElement("h3", {
    className: "text-md font-semibold mb-2"
  }, "Markets"), /*#__PURE__*/react.createElement("div", {
    className: "flex space-x-2 mb-4"
  }, /*#__PURE__*/react.createElement("input", {
    type: "text",
    value: newMarketName,
    onChange: function onChange(e) {
      return setNewMarketName(e.target.value);
    },
    placeholder: "Market Name",
    className: "flex-grow border border-gray-300 rounded p-2"
  }), /*#__PURE__*/react.createElement("input", {
    type: "text",
    value: newMarketIdentifier,
    onChange: function onChange(e) {
      return setNewMarketIdentifier(e.target.value);
    },
    placeholder: "Identifier",
    className: "flex-grow border border-gray-300 rounded p-2"
  }), /*#__PURE__*/react.createElement("button", {
    className: "bg-blue-500 text-white px-4 py-2 rounded",
    onClick: handleAddMarket
  }, "Add Market")), /*#__PURE__*/react.createElement("ul", {
    className: "space-y-2"
  }, AllMarkets.map(function (market, index) {
    return /*#__PURE__*/react.createElement("li", {
      key: "".concat(market.identifier, "-").concat(index),
      className: "flex items-center justify-between p-2 border rounded"
    }, editingMarketIndex === index ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("input", {
      type: "text",
      value: newMarketName,
      onChange: function onChange(e) {
        return setNewMarketName(e.target.value);
      },
      className: "border border-gray-300 rounded p-1 flex-grow"
    }), /*#__PURE__*/react.createElement("input", {
      type: "text",
      value: newMarketIdentifier,
      onChange: function onChange(e) {
        return setNewMarketIdentifier(e.target.value);
      },
      className: "border border-gray-300 rounded p-1 flex-grow"
    }), /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleSaveMarket(index);
      },
      className: "text-green-500 ml-2"
    }, "Save")) : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("span", null, market.name), /*#__PURE__*/react.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleEditMarket(index);
      },
      className: "text-blue-500"
    }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
      icon: free_solid_svg_icons/* faEdit */.MT7
    })), /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleDeleteMarket(index, true);
      },
      className: "text-red-500"
    }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
      icon: free_solid_svg_icons/* faTrash */.yLS
    })))));
  }))))), (activeView === 'markets' || activeView === 'details') && /*#__PURE__*/react.createElement("div", {
    className: "bg-white shadow-md rounded-lg p-4 col-span-2 min-height-800"
  }, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Markets"), /*#__PURE__*/react.createElement("ul", {
    className: "space-y-2"
  }, markets.map(function (market, index) {
    return /*#__PURE__*/react.createElement("li", {
      key: "".concat(market.partitionKey, "-").concat(market.rowKey),
      onClick: function onClick() {
        return handleMarketClick(market, index);
      },
      className: "cursor-pointer p-2 rounded ".concat((selectedMarket === null || selectedMarket === void 0 ? void 0 : selectedMarket.rowKey) === market.rowKey ? 'bg-blue-500 text-white' : 'hover:bg-gray-100')
    }, market.name || 'Unnamed Market');
  }))), activeView === 'details' && selectedMarket && /*#__PURE__*/react.createElement("div", {
    className: "bg-white shadow-md rounded-lg p-4 col-span-8 min-height-800"
  }, /*#__PURE__*/react.createElement("h2", {
    className: "text-lg font-semibold mb-4"
  }, "Details"), /*#__PURE__*/react.createElement("div", {
    className: "flex space-x-4 mb-4"
  }, /*#__PURE__*/react.createElement("button", {
    onClick: function onClick() {
      return setSelectedTab(0);
    },
    className: "px-4 py-2 rounded ".concat(selectedTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200')
  }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
    icon: free_solid_svg_icons/* faEdit */.MT7,
    className: "mr-2"
  }), "Template Layout"), /*#__PURE__*/react.createElement("button", {
    onClick: function onClick() {
      return setSelectedTab(1);
    },
    className: "px-4 py-2 rounded ".concat(selectedTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200')
  }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
    icon: free_solid_svg_icons/* faCogs */.Ubc,
    className: "mr-2"
  }), "Styling"), /*#__PURE__*/react.createElement("button", {
    onClick: function onClick() {
      return setSelectedTab(2);
    },
    className: "px-4 py-2 rounded ".concat(selectedTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200')
  }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
    icon: free_solid_svg_icons/* faTrash */.yLS,
    className: "mr-2"
  }), "Translations"), /*#__PURE__*/react.createElement("button", {
    onClick: function onClick() {
      return setSelectedTab(3);
    },
    className: "px-4 py-2 rounded ".concat(selectedTab === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200')
  }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
    icon: free_solid_svg_icons/* faCheck */.e68,
    className: "mr-2"
  }), "Settings")), /*#__PURE__*/react.createElement("div", {
    className: "tab-content"
  }, selectedTab === 0 && /*#__PURE__*/react.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Template Layout"), /*#__PURE__*/react.createElement("textarea", {
    value: templateLayoutText,
    onChange: function onChange(e) {
      return setTemplateLayoutText(e.target.value);
    },
    className: "w-full h-40 border border-gray-300 rounded p-2",
    placeholder: "Edit Template Layout here..."
  })), selectedTab === 1 && /*#__PURE__*/react.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Styling"), /*#__PURE__*/react.createElement("textarea", {
    value: templateStylingText,
    onChange: function onChange(e) {
      return setTemplateStylingText(e.target.value);
    },
    className: "w-full h-40 border border-gray-300 rounded p-2",
    placeholder: "Edit Styling here..."
  })), selectedTab === 2 && /*#__PURE__*/react.createElement("div", {
    className: "mt-4"
  }, selectedTab === 2 && /*#__PURE__*/react.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react.createElement("h3", {
    className: "text-md font-semibold mb-2"
  }, "Translations"), /*#__PURE__*/react.createElement("div", {
    className: "flex space-x-2 mb-4"
  }, /*#__PURE__*/react.createElement("input", {
    type: "text",
    value: newTranslationKey,
    onChange: function onChange(e) {
      return setNewTranslationKey(e.target.value);
    },
    placeholder: "Translation Key",
    className: "flex-grow border border-gray-300 rounded p-2"
  }), /*#__PURE__*/react.createElement("input", {
    type: "text",
    value: newTranslationValue,
    onChange: function onChange(e) {
      return setNewTranslationValue(e.target.value);
    },
    placeholder: "Translation Value",
    className: "flex-grow border border-gray-300 rounded p-2"
  }), /*#__PURE__*/react.createElement("button", {
    className: "bg-blue-500 text-white px-4 py-2 rounded",
    onClick: addTranslation
  }, "Add Translationss")), /*#__PURE__*/react.createElement("ul", {
    className: "space-y-2"
  }, translations.map(function (translation, index) {
    return /*#__PURE__*/react.createElement("li", {
      key: "".concat(translation.Key, "-").concat(index),
      className: "flex items-center justify-between p-2 border rounded"
    }, editingTranslationIndex === index ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("input", {
      type: "text",
      value: newTranslationKey,
      onChange: function onChange(e) {
        return setNewTranslationKey(e.target.value);
      },
      className: "border border-gray-300 rounded p-1 flex-grow"
    }), /*#__PURE__*/react.createElement("input", {
      type: "text",
      value: newTranslationValue,
      onChange: function onChange(e) {
        return setNewTranslationValue(e.target.value);
      },
      className: "border border-gray-300 rounded p-1 flex-grow"
    }), /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleSaveTranslation(index);
      },
      className: "text-green-500 ml-2"
    }, "Save")) : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("span", null, translation.Key, " - ", translation.Value), /*#__PURE__*/react.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleEditTranslation(index);
      },
      className: "text-blue-500"
    }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
      icon: free_solid_svg_icons/* faEdit */.MT7
    })), /*#__PURE__*/react.createElement("button", {
      onClick: function onClick() {
        return handleDeleteTranslation(index);
      },
      className: "text-red-500"
    }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.g, {
      icon: free_solid_svg_icons/* faTrash */.yLS
    })))));
  })))), selectedTab === 3 && /*#__PURE__*/react.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react.createElement("label", {
    className: "inline-flex items-center"
  }, /*#__PURE__*/react.createElement("input", {
    type: "checkbox",
    className: "form-checkbox h-5 w-5 text-blue-600",
    checked: autoRegenerate,
    onChange: handleToggleSwitch
  }), /*#__PURE__*/react.createElement("span", {
    className: "ml-2"
  }, "Allow automatic regeneration")))), /*#__PURE__*/react.createElement("button", {
    className: "bg-blue-500 text-white px-4 py-2 rounded mt-4",
    onClick: function onClick() {
      return saveMarketForCategory(editingMarketIndex);
    }
  }, "Save")))));
};
/* harmony default export */ const admin_App = (App);
;// CONCATENATED MODULE: ./src/admin/reportWebVitals.js
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
/* harmony default export */ const admin_reportWebVitals = (reportWebVitals);
;// CONCATENATED MODULE: ./src/admin/index.js





 // Adjust the path as necessary
 // Import Tailwind CSS
 // Import your custom CSS if applicable

var root = client.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/react.createElement(react.StrictMode, null, /*#__PURE__*/react.createElement(admin_App, null)));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
admin_reportWebVitals();

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 			884: 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [391,240], () => (__webpack_require__(724)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.asset.js.map