"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userMappingAssign = exports.updateSubscribedExistUser = exports.updateSubscribed = exports.updateCancel = exports.unassignUser = exports.getNewUsers = exports.getExistUsers = void 0;
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _helper = require("../../../utils/helper.util");
var _moment = _interopRequireDefault(require("moment"));
var _message = require("../../../notifications/message.sender");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var updateCancel = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var id, add_on_id;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = req.body.id;
            add_on_id = req.query.add_on_id;
            if (!add_on_id) {
              _context.next = 8;
              break;
            }
            _context.next = 6;
            return (0, _db["default"])("add_on_orders").update({
              status: "cancelled"
            }).where({
              id: add_on_id
            });
          case 6:
            _context.next = 10;
            break;
          case 8:
            _context.next = 10;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "branch_cancelled"
            }).where({
              id: id
            });
          case 10:
            req.flash("success", "subscription cancelled ");
            res.redirect("/branch_admin/subscription/get_new_users");
            _context.next = 18;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.redirect("/home");
          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function updateCancel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.updateCancel = updateCancel;
var updateSubscribedExistUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, router_id, date, add_on_order_id, address_id, sub_id;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, router_id = _req$body.router_id, date = _req$body.date, add_on_order_id = _req$body.add_on_order_id, address_id = _req$body.address_id, sub_id = _req$body.sub_id;
            if (!add_on_order_id) {
              _context2.next = 5;
              break;
            }
            _context2.next = 5;
            return (0, _db["default"])("add_on_orders").update({
              status: "new_order"
            }).where({
              id: add_on_order_id
            });
          case 5:
            if (!sub_id) {
              _context2.next = 8;
              break;
            }
            _context2.next = 8;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "subscribed",
              router_id: router_id,
              subscription_start_date: new Date().toISOString().slice(0, 19).replace("T", " "),
              date: date
            }).where({
              id: sub_id
            });
          case 8:
            req.flash("success", "Approved successfully");
            return _context2.abrupt("return", res.redirect("/branch_admin/subscription/get_exist_users"));
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.redirect("/home"));
          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function updateSubscribedExistUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateSubscribedExistUser = updateSubscribedExistUser;
var updateSubscribed = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, router_id, date, add_on_order_id, address_id, sub_id, user_id, _req$query, is_exist, is_user_mapping_assign, i, users, arr_users, get_users;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            // const { sub_id, router_id, date, add_on_id, user_id } = req.body;
            _req$body2 = req.body, router_id = _req$body2.router_id, date = _req$body2.date, add_on_order_id = _req$body2.add_on_order_id, address_id = _req$body2.address_id, sub_id = _req$body2.sub_id, user_id = _req$body2.user_id;
            _req$query = req.query, is_exist = _req$query.is_exist, is_user_mapping_assign = _req$query.is_user_mapping_assign;
            if (!add_on_order_id) {
              _context3.next = 16;
              break;
            }
            if (!(typeof add_on_order_id == "string")) {
              _context3.next = 9;
              break;
            }
            _context3.next = 7;
            return (0, _db["default"])("add_on_orders").update({
              status: "new_order"
            }).where({
              id: add_on_order_id
            });
          case 7:
            _context3.next = 16;
            break;
          case 9:
            i = 0;
          case 10:
            if (!(i < add_on_order_id.length)) {
              _context3.next = 16;
              break;
            }
            _context3.next = 13;
            return (0, _db["default"])("add_on_orders").update({
              status: "new_order"
            }).where({
              id: add_on_order_id[i]
            });
          case 13:
            i++;
            _context3.next = 10;
            break;
          case 16:
            if (!sub_id) {
              _context3.next = 21;
              break;
            }
            _context3.next = 19;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "subscribed",
              router_id: router_id,
              subscription_start_date: new Date().toISOString().slice(0, 19).replace("T", " "),
              date: date
            }).where({
              id: sub_id
            });
          case 19:
            _context3.next = 21;
            return (0, _message.sendNotification)({
              include_external_user_ids: [user_id.toString()],
              contents: {
                en: "Your Subsciption Was Placed, Your Susbcription Start From ".concat((0, _moment["default"])(date).format("DD-MM-YYYY"))
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Appoinment Request",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: sub_id,
                bill_id: 0
              }
            });
          case 21:
            _context3.next = 23;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: router_id
            });
          case 23:
            users = _context3.sent;
            if (!(users.length === 0 || users[0].user_mapping === null)) {
              _context3.next = 30;
              break;
            }
            arr_users = [Number(address_id)];
            _context3.next = 28;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(arr_users)
            }).where({
              id: router_id
            });
          case 28:
            _context3.next = 36;
            break;
          case 30:
            _context3.next = 32;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: router_id
            });
          case 32:
            get_users = _context3.sent;
            get_users[0].user_mapping.push(Number(address_id));
            _context3.next = 36;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(get_users[0].user_mapping)
            }).where({
              id: router_id
            });
          case 36:
            _context3.next = 38;
            return (0, _db["default"])("user_address").update({
              router_id: router_id
            }).where({
              id: address_id
            });
          case 38:
            // this below call from user mapping assign

            // // if (!date) {
            // //   req.flash("error", "Please Choose a Date ");
            // //   return res.redirect("/branch_admin/subscription/get_new_users");
            // // }

            // // add on new new_user
            // // let address_id;
            // if (add_on_id) {
            //   await knex("add_on_orders")
            //     .update({ status: "new_order" })
            //     .where({ id: add_on_id });

            //   const get_add_on_address_id = await knex("add_on_orders")
            //     .select("address_id")
            //     .where({ id: add_on_id });

            //   address_id = get_add_on_address_id[0].address_id;
            // } else {
            //   // else subscribed new_user
            //   const get_address_id = await knex("subscribed_user_details")
            //     .select("user_address_id")
            //     .where({ id: sub_id });

            //   address_id = get_address_id[0].user_address_id;
            // }

            // // check if is not exist user(this api call in both new user and exist user)
            // if (!is_exist) {
            //   const users = await knex("routes")
            //     .select("user_mapping")
            //     .where({ id: router_id });

            //   if (users.length === 0 || users[0].user_mapping === null) {
            //     let arr_users = [Number(address_id)];
            //     await knex("routes")
            //       .update({ user_mapping: JSON.stringify(arr_users) })
            //       .where({ id: router_id });
            //   } else {
            //     const get_users = await knex("routes")
            //       .select("user_mapping")
            //       .where({ id: router_id });
            //     get_users[0].user_mapping.push(Number(address_id));

            //     await knex("routes")
            //       .update({ user_mapping: JSON.stringify(get_users[0].user_mapping) })
            //       .where({ id: router_id });
            //   }

            //   await knex("user_address")
            //     .update({ router_id })
            //     .where({ id: address_id });
            // }

            req.flash("success", "subscribed successfully");
            if (!is_exist) {
              _context3.next = 41;
              break;
            }
            return _context3.abrupt("return", res.redirect("/branch_admin/subscription/get_exist_users"));
          case 41:
            res.redirect("/branch_admin/subscription/get_new_users");
            _context3.next = 48;
            break;
          case 44:
            _context3.prev = 44;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.redirect("/home");
          case 48:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 44]]);
  }));
  return function updateSubscribed(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.updateSubscribed = updateSubscribed;
var getNewUsers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var loading, searchKeyword, admin_id, data_length, data_length_2, search_data_length, search_data_2_length, routes, both_data, _yield$getPageNumber, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data, subscription_users, add_on_users, i, search_query, add_on_order_query, get_user_products_query, _i, j, view_add_on_products, _i2, _j, _i3, _j2;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            admin_id = req.body.admin_id;
            data_length = [];
            data_length_2 = [];
            if (!searchKeyword) {
              _context4.next = 22;
              break;
            }
            _context4.next = 9;
            return _db["default"].raw("SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.branch_id = ".concat(admin_id, " AND subscribed_user_details.subscription_status = \"assigned\" AND users.user_unique_id LIKE '%").concat(searchKeyword, "%'"));
          case 9:
            search_data_length = _context4.sent;
            _context4.next = 12;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,\n        users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n          user_address.address,user_address.id as user_address_id ,user_address.landmark\n          FROM add_on_orders as adds \n          JOIN users ON users.id = adds.user_id \n          JOIN user_address ON user_address.id = adds.address_id\n          WHERE adds.branch_id = ".concat(admin_id, " AND adds.status = \"assigned\" AND  users.user_unique_id LIKE '%").concat(searchKeyword, "%'"));
          case 12:
            search_data_2_length = _context4.sent;
            data_length = search_data_length[0];
            data_length_2 = search_data_2_length[0];
            if (!(data_length.length === 0 && data_length_2.length === 0)) {
              _context4.next = 20;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No User Found");
            return _context4.abrupt("return", res.redirect("/branch_admin/subscription/get_new_users"));
          case 20:
            _context4.next = 28;
            break;
          case 22:
            _context4.next = 24;
            return (0, _db["default"])("subscribed_user_details").select("id").where({
              subscription_status: "assigned",
              branch_id: admin_id
            });
          case 24:
            data_length = _context4.sent;
            _context4.next = 27;
            return (0, _db["default"])("add_on_orders").select("id").where({
              branch_id: admin_id,
              status: "assigned"
            });
          case 27:
            data_length_2 = _context4.sent;
          case 28:
            _context4.next = 30;
            return (0, _db["default"])("routes").select("name", "id").where({
              status: "1",
              branch_id: admin_id
            });
          case 30:
            routes = _context4.sent;
            if (!(data_length.length === 0 && data_length_2.length === 0)) {
              _context4.next = 34;
              break;
            }
            loading = false;
            return _context4.abrupt("return", res.render("branch_admin/subscription/pending", {
              subscription_users: data_length,
              add_on_users: data_length_2,
              searchKeyword: searchKeyword,
              routes: routes
            }));
          case 34:
            both_data = [];
            if (data_length.length === 0 && data_length_2.length !== 0) {
              both_data = data_length_2;
            } else if (data_length.length !== 0 && data_length_2.length === 0) {
              both_data = data_length;
            } else {
              both_data = [].concat(_toConsumableArray(data_length), _toConsumableArray(data_length_2));
            }
            _context4.next = 38;
            return (0, _helper.getPageNumber)(req, res, both_data, "subscription/get_new_users");
          case 38:
            _yield$getPageNumber = _context4.sent;
            startingLimit = _yield$getPageNumber.startingLimit;
            page = _yield$getPageNumber.page;
            resultsPerPage = _yield$getPageNumber.resultsPerPage;
            numberOfPages = _yield$getPageNumber.numberOfPages;
            iterator = _yield$getPageNumber.iterator;
            endingLink = _yield$getPageNumber.endingLink;
            is_search = false;
            data = [];
            subscription_users = [];
            add_on_users = [];
            if (!(data_length !== 0)) {
              _context4.next = 62;
              break;
            }
            if (!searchKeyword) {
              _context4.next = 57;
              break;
            }
            _context4.next = 53;
            return _db["default"].raw("SELECT sub.id ,sub.user_id, sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,\n        unit_types.value,categories.name as category_name\n        FROM subscribed_user_details AS sub \n        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id \n        JOIN users ON users.id = sub.user_id \n        JOIN user_address ON user_address.id = sub.user_address_id\n        JOIN products ON products.id = sub.product_id\n        JOIN unit_types ON unit_types.id = products.unit_type_id\n        JOIN categories ON categories.id = products.category_id\n        WHERE sub.subscription_status = \"assigned\" AND sub.branch_id = ".concat(admin_id, "\n        AND users.user_unique_id LIKE '%").concat(searchKeyword, "%'"));
          case 53:
            results = _context4.sent;
            is_search = true;
            _context4.next = 60;
            break;
          case 57:
            _context4.next = 59;
            return _db["default"].raw("SELECT sub.id ,sub.user_id,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,\n        unit_types.value,categories.name as category_name\n        FROM subscribed_user_details AS sub \n        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id \n        JOIN users ON users.id = sub.user_id \n        JOIN user_address ON user_address.id = sub.user_address_id\n        JOIN products ON products.id = sub.product_id\n        JOIN unit_types ON unit_types.id = products.unit_type_id\n        JOIN categories ON categories.id = products.category_id\n        WHERE sub.subscription_status = \"assigned\" AND sub.branch_id = ".concat(admin_id));
          case 59:
            results = _context4.sent;
          case 60:
            subscription_users = results[0];
            for (i = 0; i < subscription_users.length; i++) {
              subscription_users[i].start_date = (0, _moment["default"])(subscription_users[i].start_date).format("DD-MM-YYYY");
              subscription_users[i].default_show_start_date = (0, _moment["default"])(subscription_users[i].start_date).format("YYYY-DD-MM");
              subscription_users[i].image = process.env.BASE_URL + subscription_users[i].image;
            }
          case 62:
            if (searchKeyword) {
              search_query = "AND  users.user_unique_id LIKE '%".concat(searchKeyword, "%'");
            }
            _context4.next = 65;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,\n    users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n      user_address.address,user_address.id as user_address_id ,user_address.landmark\n      FROM add_on_orders as adds \n      JOIN users ON users.id = adds.user_id \n      JOIN user_address ON user_address.id = adds.address_id\n      WHERE adds.branch_id = ".concat(admin_id, " AND adds.status = \"assigned\" ").concat(searchKeyword ? search_query : ""));
          case 65:
            add_on_order_query = _context4.sent;
            console.log(add_on_order_query[0]);
            if (!(add_on_order_query[0].length !== 0)) {
              _context4.next = 82;
              break;
            }
            _i = 0;
          case 69:
            if (!(_i < add_on_order_query[0].length)) {
              _context4.next = 82;
              break;
            }
            _context4.next = 72;
            return (0, _db["default"])("add_on_order_items as adds").select("adds.add_on_order_id", "adds.quantity", "adds.price", "adds.total_price", "products.name as product_name", "products.image", "products.unit_value", "unit_types.value").join("products", "products.id", "=", "adds.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").where({
              "adds.add_on_order_id": add_on_order_query[0][_i].id
            });
          case 72:
            get_user_products_query = _context4.sent;
            for (j = 0; j < get_user_products_query.length; j++) {
              get_user_products_query[j].image = process.env.BASE_URL + get_user_products_query[j].image;
            }
            add_on_order_query[0][_i].is_add_on = true;
            add_on_order_query[0][_i].add_on_order_id = add_on_order_query[0][_i].id;
            add_on_order_query[0][_i].add_on_products = get_user_products_query;
            add_on_order_query[0][_i].delivery_date = (0, _moment["default"])(add_on_order_query[0][_i].delivery_date).format("DD-MM-YYYY");
            add_on_users.push(add_on_order_query[0][_i]);
          case 79:
            _i++;
            _context4.next = 69;
            break;
          case 82:
            // check that new user did the sub and add on at same time (like if he did the add on while pending the subscription)
            view_add_on_products = [];
            for (_i2 = 0; _i2 < subscription_users.length; _i2++) {
              for (_j = 0; _j < add_on_users.length; _j++) {
                if (add_on_users[_j].user_address_id == subscription_users[_i2].user_address_id) {
                  add_on_users[_j].is_subscription_pending = true;
                  subscription_users[_i2].is_add_on_pending = true;
                  view_add_on_products.push({
                    add_on_order_id: add_on_users[_j].add_on_order_id,
                    delivery_date: add_on_users[_j].delivery_date,
                    sub_total: add_on_users[_j].sub_total,
                    add_on_products: add_on_users[_j].add_on_products
                  });
                }
              }
              subscription_users[_i2].add_on_details = view_add_on_products;
              view_add_on_products = [];
            }

            // if new user did the two add on orders

            for (_i3 = 0; _i3 < add_on_users.length; _i3++) {
              if (add_on_users[_i3].is_subscription_pending != true) {
                for (_j2 = 0; _j2 < add_on_users.length; _j2++) {
                  if (add_on_users[_i3].user_address_id == add_on_users[_j2].user_address_id && add_on_users[_i3].id != add_on_users[_j2].id) {
                    add_on_users[_i3].is_add_on_duplicate = true;
                    add_on_users[_j2].is_add_on_duplicate = true;
                    if (add_on_users[_j2].add_on_duplicate_details) {
                      add_on_users[_j2].add_on_duplicate_details.push({
                        add_on_order_id: add_on_users[_i3].add_on_order_id,
                        delivery_date: add_on_users[_i3].delivery_date,
                        sub_total: add_on_users[_i3].sub_total,
                        add_on_products: add_on_users[_i3].add_on_products
                      });
                    } else {
                      add_on_users[_j2].add_on_duplicate_details = [{
                        add_on_order_id: add_on_users[_j2].add_on_order_id,
                        delivery_date: add_on_users[_j2].delivery_date,
                        sub_total: add_on_users[_j2].sub_total,
                        add_on_products: add_on_users[_j2].add_on_products
                      }, {
                        add_on_order_id: add_on_users[_i3].add_on_order_id,
                        delivery_date: add_on_users[_i3].delivery_date,
                        sub_total: add_on_users[_i3].sub_total,
                        add_on_products: add_on_users[_i3].add_on_products
                      }];
                    }
                  }
                }
              }
            }
            loading = false;
            res.render("branch_admin/subscription/pending", {
              data: data,
              subscription_users: subscription_users,
              add_on_users: add_on_users,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: 1,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              routes: routes
            });
            _context4.next = 93;
            break;
          case 89:
            _context4.prev = 89;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.redirect("/home");
          case 93:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 89]]);
  }));
  return function getNewUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getNewUsers = getNewUsers;
var getExistUsers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var loading, searchKeyword, admin_id, data_length, data_length_2, search_data_length, search_data_2_length, routes, both_data, _yield$getPageNumber2, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data, subscription_users, add_on_users, i, search_query, add_on_order_query, get_user_products_query, _i4, j;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            admin_id = req.body.admin_id;
            data_length = [];
            data_length_2 = [];
            if (!searchKeyword) {
              _context5.next = 22;
              break;
            }
            _context5.next = 9;
            return _db["default"].raw("SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.branch_id = ".concat(admin_id, " AND subscribed_user_details.subscription_status = \"branch_pending\" AND users.user_unique_id LIKE '%").concat(searchKeyword, "%'"));
          case 9:
            search_data_length = _context5.sent;
            _context5.next = 12;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,\n        users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n          user_address.address,user_address.id as user_address_id ,user_address.landmark\n          FROM add_on_orders as adds \n          JOIN users ON users.id = adds.user_id \n          JOIN user_address ON user_address.id = adds.address_id\n          WHERE adds.branch_id = ".concat(admin_id, " AND adds.status = \"branch_pending\" AND  users.user_unique_id LIKE '%").concat(searchKeyword, "%'"));
          case 12:
            search_data_2_length = _context5.sent;
            data_length = search_data_length[0];
            data_length_2 = search_data_2_length[0];
            if (!(data_length.length === 0 && data_length_2.length === 0)) {
              _context5.next = 20;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No User Found");
            return _context5.abrupt("return", res.redirect("/branch_admin/subscription/get_exist_users"));
          case 20:
            _context5.next = 28;
            break;
          case 22:
            _context5.next = 24;
            return (0, _db["default"])("subscribed_user_details").select("id").where({
              subscription_status: "branch_pending",
              branch_id: admin_id
            });
          case 24:
            data_length = _context5.sent;
            _context5.next = 27;
            return (0, _db["default"])("add_on_orders").select("id").where({
              branch_id: admin_id,
              status: "branch_pending"
            });
          case 27:
            data_length_2 = _context5.sent;
          case 28:
            _context5.next = 30;
            return (0, _db["default"])("routes").select("name", "id").where({
              status: "1",
              branch_id: admin_id
            });
          case 30:
            routes = _context5.sent;
            if (!(data_length.length === 0 && data_length_2.length === 0)) {
              _context5.next = 34;
              break;
            }
            loading = false;
            return _context5.abrupt("return", res.render("branch_admin/subscription/exist_user", {
              subscription_users: data_length,
              add_on_users: data_length_2,
              searchKeyword: searchKeyword,
              routes: routes
            }));
          case 34:
            both_data = [];
            if (data_length.length === 0 && data_length_2.length !== 0) {
              both_data = data_length_2;
            } else if (data_length.length !== 0 && data_length_2.length === 0) {
              both_data = data_length;
            } else {
              both_data = [].concat(_toConsumableArray(data_length), _toConsumableArray(data_length_2));
            }
            _context5.next = 38;
            return (0, _helper.getPageNumber)(req, res, both_data, "subscription/get_exist_users");
          case 38:
            _yield$getPageNumber2 = _context5.sent;
            startingLimit = _yield$getPageNumber2.startingLimit;
            page = _yield$getPageNumber2.page;
            resultsPerPage = _yield$getPageNumber2.resultsPerPage;
            numberOfPages = _yield$getPageNumber2.numberOfPages;
            iterator = _yield$getPageNumber2.iterator;
            endingLink = _yield$getPageNumber2.endingLink;
            is_search = false;
            data = [];
            subscription_users = [];
            add_on_users = [];
            if (!(data_length !== 0)) {
              _context5.next = 62;
              break;
            }
            if (!searchKeyword) {
              _context5.next = 57;
              break;
            }
            _context5.next = 53;
            return _db["default"].raw("SELECT sub.id ,sub.change_plan_id, sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,\n        unit_types.value,categories.name as category_name\n        FROM subscribed_user_details AS sub \n        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id \n        JOIN users ON users.id = sub.user_id \n        JOIN user_address ON user_address.id = sub.user_address_id\n        JOIN products ON products.id = sub.product_id\n        JOIN unit_types ON unit_types.id = products.unit_type_id\n        JOIN categories ON categories.id = products.category_id\n        WHERE sub.subscription_status = \"branch_pending\" AND sub.branch_id = ".concat(admin_id, "\n        AND users.user_unique_id LIKE '%").concat(searchKeyword, "%'"));
          case 53:
            results = _context5.sent;
            is_search = true;
            _context5.next = 60;
            break;
          case 57:
            _context5.next = 59;
            return _db["default"].raw("SELECT sub.id ,sub.change_plan_id,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,\n        unit_types.value,categories.name as category_name\n        FROM subscribed_user_details AS sub \n        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id \n        JOIN users ON users.id = sub.user_id \n        JOIN user_address ON user_address.id = sub.user_address_id\n        JOIN products ON products.id = sub.product_id\n        JOIN unit_types ON unit_types.id = products.unit_type_id\n        JOIN categories ON categories.id = products.category_id\n        WHERE sub.subscription_status = \"branch_pending\" AND sub.branch_id = ".concat(admin_id));
          case 59:
            results = _context5.sent;
          case 60:
            subscription_users = results[0];
            for (i = 0; i < subscription_users.length; i++) {
              subscription_users[i].start_date = (0, _moment["default"])(subscription_users[i].start_date).format("DD-MM-YYYY");
              subscription_users[i].image = process.env.BASE_URL + subscription_users[i].image;
            }
          case 62:
            if (searchKeyword) {
              search_query = "AND  users.user_unique_id LIKE '%".concat(searchKeyword, "%'");
            }
            _context5.next = 65;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,\n    users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n      user_address.address,user_address.id as user_address_id ,user_address.landmark\n      FROM add_on_orders as adds \n      JOIN users ON users.id = adds.user_id \n      JOIN user_address ON user_address.id = adds.address_id\n      WHERE adds.branch_id = ".concat(admin_id, " AND adds.status = \"branch_pending\" ").concat(searchKeyword ? search_query : ""));
          case 65:
            add_on_order_query = _context5.sent;
            if (!(add_on_order_query[0].length !== 0)) {
              _context5.next = 81;
              break;
            }
            _i4 = 0;
          case 68:
            if (!(_i4 < add_on_order_query[0].length)) {
              _context5.next = 81;
              break;
            }
            _context5.next = 71;
            return (0, _db["default"])("add_on_order_items as adds").select("adds.add_on_order_id", "adds.quantity", "adds.price", "adds.total_price", "products.name as product_name", "products.image", "products.unit_value", "unit_types.value").join("products", "products.id", "=", "adds.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").where({
              "adds.add_on_order_id": add_on_order_query[0][_i4].id
            });
          case 71:
            get_user_products_query = _context5.sent;
            for (j = 0; j < get_user_products_query.length; j++) {
              get_user_products_query[j].image = process.env.BASE_URL + get_user_products_query[j].image;
            }
            add_on_order_query[0][_i4].is_add_on = true;
            add_on_order_query[0][_i4].add_on_order_id = add_on_order_query[0][_i4].id;
            add_on_order_query[0][_i4].add_on_products = get_user_products_query;
            add_on_order_query[0][_i4].delivery_date = (0, _moment["default"])(add_on_order_query[0][_i4].delivery_date).format("DD-MM-YYYY");
            add_on_users.push(add_on_order_query[0][_i4]);
          case 78:
            _i4++;
            _context5.next = 68;
            break;
          case 81:
            console.log(subscription_users);
            console.log(add_on_users);
            loading = false;
            res.render("branch_admin/subscription/exist_user", {
              data: data,
              subscription_users: subscription_users,
              add_on_users: add_on_users,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: 1,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              routes: routes
            });
            _context5.next = 91;
            break;
          case 87:
            _context5.prev = 87;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.redirect("/home");
          case 91:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 87]]);
  }));
  return function getExistUsers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getExistUsers = getExistUsers;
var userMappingAssign = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, router_id, address_id, users, arr_users, get_users;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body3 = req.body, router_id = _req$body3.router_id, address_id = _req$body3.address_id;
            _context6.next = 4;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: router_id
            });
          case 4:
            users = _context6.sent;
            if (!(users.length === 0 || users[0].user_mapping === null)) {
              _context6.next = 11;
              break;
            }
            arr_users = [Number(address_id)];
            _context6.next = 9;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(arr_users)
            }).where({
              id: router_id
            });
          case 9:
            _context6.next = 17;
            break;
          case 11:
            _context6.next = 13;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: router_id
            });
          case 13:
            get_users = _context6.sent;
            get_users[0].user_mapping.push(Number(address_id));
            _context6.next = 17;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(get_users[0].user_mapping)
            }).where({
              id: router_id
            });
          case 17:
            _context6.next = 19;
            return (0, _db["default"])("user_address").update({
              router_id: router_id
            }).where({
              id: address_id
            });
          case 19:
            req.flash("success", "Route Assigned Successfully");
            // return res.redirect(`/branch_admin/route/user_mapping?route_id=${is_user_mapping_assign}`)
            return _context6.abrupt("return", res.redirect("/branch_admin/route/get_route"));
          case 23:
            _context6.prev = 23;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            res.redirect("/home");
          case 27:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 23]]);
  }));
  return function userMappingAssign(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.userMappingAssign = userMappingAssign;
var unassignUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body4, address_id, router_id, users, user_mapping, i;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body4 = req.body, address_id = _req$body4.address_id, router_id = _req$body4.router_id;
            _context7.next = 4;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: router_id
            });
          case 4:
            users = _context7.sent;
            user_mapping = users[0].user_mapping;
            if (!(user_mapping.length == 1)) {
              _context7.next = 11;
              break;
            }
            _context7.next = 9;
            return (0, _db["default"])("routes").update({
              user_mapping: null
            }).where({
              id: router_id
            });
          case 9:
            _context7.next = 12;
            break;
          case 11:
            for (i = 0; i < user_mapping.length; i++) {
              if (user_mapping[i] == address_id) {
                user_mapping.splice(i, 1);
              }
            }
          case 12:
            _context7.next = 14;
            return (0, _db["default"])("user_address").update({
              router_id: null
            }).where({
              id: address_id
            });
          case 14:
            req.flash("success", "SuccessFully UnAssigned");
            return _context7.abrupt("return", res.redirect("/branch_admin/route/get_route"));
          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.redirect("/home"));
          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return function unassignUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// export const getExistUsers = async (req, res) => {
//   try {
//     const { admin_id } = req.body;
//     let loading = true;
//     const { searchKeyword } = req.query;

//     let data_length = [];
//     let data_length_2 = [];

//     if (searchKeyword) {
//       const search_data_length = await knex.raw(
//         `SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.branch_id = ${admin_id} AND subscribed_user_details.subscription_status = "branch_pending" AND users.user_unique_id LIKE '%${searchKeyword}%'`
//       );

//       const search_data_2_length = await knex.raw(
//         `SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
//         users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
//           user_address.address,user_address.id as user_address_id ,user_address.landmark
//           FROM add_on_orders as adds
//           JOIN users ON users.id = adds.user_id
//           JOIN user_address ON user_address.id = adds.address_id
//           WHERE adds.branch_id = ${admin_id} AND adds.status = "branch_pending" AND  users.user_unique_id LIKE '%${searchKeyword}%'`
//       );

//       data_length = search_data_length[0];
//       data_length_2 = search_data_2_length[0];
//       if (data_length.length === 0 && data_length_2.length === 0) {
//         loading = false;
//         req.query.searchKeyword = "";
//         req.flash("error", "No User Found");
//         return res.redirect("/branch_admin/subscription/get_exist_users");
//       }
//     } else {
//       data_length = await knex("subscribed_user_details")
//         .select("id")
//         .where({ subscription_status: "branch_pending" });

//       data_length_2 = await knex("add_on_orders")
//         .select("id")
//         .where({ branch_id: admin_id, status: "branch_pending" });
//     }

//     const routes = await knex("routes")
//       .select("name", "id")
//       .where({ status: "1", branch_id: admin_id });

//     if (data_length.length === 0 && data_length_2.length === 0) {
//       loading = false;
//       return res.render("branch_admin/subscription/exist_user", {
//         data: data_length,
//         searchKeyword,
//         routes,
//       });
//     }

//     let both_data = [];
//     if (data_length.length === 0 && data_length_2.length !== 0) {
//       both_data = data_length_2;
//     } else if (data_length.length !== 0 && data_length_2.length === 0) {
//       both_data = data_length;
//     } else {
//       both_data = [...data_length, ...data_length_2];
//     }

//     console.log(both_data);

//     let {
//       startingLimit,
//       page,
//       resultsPerPage,
//       numberOfPages,
//       iterator,
//       endingLink,
//     } = await getPageNumber(
//       req,
//       res,
//       both_data,
//       "subscription/get_exist_users"
//     );

//     let results;
//     let is_search = false;
//     let data = [];
//     if (data_length !== 0) {
//       if (searchKeyword) {
//         results = await knex.raw(
//           `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
//         user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
//         unit_types.value,categories.name as category_name,routes.name as route_name ,routes.id as route_id
//         FROM subscribed_user_details AS sub
//         JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//         JOIN users ON users.id = sub.user_id
//         JOIN user_address ON user_address.id = sub.user_address_id
//         JOIN routes ON routes.id = user_address.router_id
//         JOIN products ON products.id = sub.product_id
//         JOIN unit_types ON unit_types.id = products.unit_type_id
//         JOIN categories ON categories.id = products.category_id
//         WHERE sub.subscription_status = "branch_pending" AND sub.branch_id = ${admin_id}
//         AND users.user_unique_id LIKE '%${searchKeyword}%'`
//         );
//         is_search = true;
//       } else {
//         results = await knex.raw(
//           `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
//         user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
//         unit_types.value,categories.name as category_name,routes.name as route_name ,routes.id as route_id
//         FROM subscribed_user_details AS sub
//         JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//         JOIN users ON users.id = sub.user_id
//         JOIN user_address ON user_address.id = sub.user_address_id
//         JOIN routes ON routes.id = user_address.router_id
//         JOIN products ON products.id = sub.product_id
//         JOIN unit_types ON unit_types.id = products.unit_type_id
//         JOIN categories ON categories.id = products.category_id
//         WHERE sub.subscription_status = "branch_pending" AND sub.branch_id = ${admin_id}`
//         );
//       }
//       data = results[0];
//       for (let i = 0; i < data.length; i++) {
//         data[i].start_date = moment(data[i].start_date).format("DD-MM-YYYY");
//         data[i].image = process.env.BASE_URL + data[i].image;
//       }
//     }
//     let search_query;
//     if (searchKeyword) {
//       search_query = `AND  users.user_unique_id LIKE '%${searchKeyword}%'`;
//     }

//     const add_on_order_query =
//       await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
//     users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
//       user_address.address,user_address.id as user_address_id ,user_address.landmark
//       FROM add_on_orders as adds
//       JOIN users ON users.id = adds.user_id
//       JOIN user_address ON user_address.id = adds.address_id
//       WHERE adds.branch_id = ${admin_id} AND adds.status = "branch_pending" ${
//         searchKeyword ? search_query : ""
//       }`);

//     // console.log(add_on_order_query[0]);

//     let get_user_products_query;
//     if (add_on_order_query[0].length !== 0) {
//       for (let i = 0; i < add_on_order_query[0].length; i++) {
//         get_user_products_query = await knex("add_on_order_items as adds")
//           .select(
//             "adds.add_on_order_id",
//             "adds.quantity",
//             "adds.price",
//             "adds.total_price",
//             "products.name as product_name",
//             "products.image",
//             "products.unit_value",
//             "unit_types.value"
//           )
//           .join("products", "products.id", "=", "adds.product_id")
//           .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
//           .where({ "adds.add_on_order_id": add_on_order_query[0][i].id });

//         for (let j = 0; j < get_user_products_query.length; j++) {
//           get_user_products_query[j].image =
//             process.env.BASE_URL + get_user_products_query[j].image;
//         }
//         add_on_order_query[0][i].is_add_on = true;
//         add_on_order_query[0][i].add_on_products = get_user_products_query;
//         add_on_order_query[0][i].delivery_date = add_on_order_query[0][
//           i
//         ].delivery_date
//           .toString()
//           .slice(4, 16);
//         data.push(add_on_order_query[0][i]);
//       }
//       // console.log(get_user_products_query)
//     }

//     loading = false;
//     res.render("branch_admin/subscription/exist_user", {
//       data: data,
//       page,
//       iterator,
//       endingLink,
//       numberOfPages: 1,
//       is_search,
//       searchKeyword,
//       loading,
//       routes,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };
exports.unassignUser = unassignUser;