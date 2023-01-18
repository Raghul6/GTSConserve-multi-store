"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _approve = require("../../controllers/super_admin/users_subscription/approve.controller");
var _pending = require("../../controllers/super_admin/users_subscription/pending.controller");
var _cancel = require("../../controllers/super_admin/users_subscription/cancel.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var users_subscriptionRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});

// user feedback
users_subscriptionRouter.get("/get_user_feedback", _pending.getUserFeedback);

//new users
users_subscriptionRouter.get("/get_new_users", _pending.getNewUsers);
users_subscriptionRouter.get("/get_all_users", _pending.getAllUsers);
users_subscriptionRouter.get("/single_user", _pending.getSingleUser);
users_subscriptionRouter.post("/update_all_users_status", _pending.updateAllUsersStatus);
users_subscriptionRouter.post("/updateUser", _pending.updateUser);

// subscribe and unsubscribe 
users_subscriptionRouter.post("/unsubscribe_subscription", _pending.unsubscribeSubscription);
users_subscriptionRouter.post("/subscribe_subscription", _pending.subscribeSubscription);

// pending
// users_subscriptionRouter.get('/get_new_users',getNewUsers)
users_subscriptionRouter.post('/approve_pending_list', _pending.updatePendingList);
users_subscriptionRouter.post('/cancel_pending_list', _pending.cancelPendingList);

//create users
users_subscriptionRouter.get("/get_create_user", _pending.getCreateUsers);
users_subscriptionRouter.post("/create_user", _pending.createUsers);

//assign
users_subscriptionRouter.get('/get_assign_list', _approve.getApproveList);

// cancel
users_subscriptionRouter.get('/get_cancel_list', _cancel.getCancelList);
var _default = users_subscriptionRouter;
exports["default"] = _default;