"use strict";

var _interopRequireWildcard = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireWildcard.js").default;
var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var controller = _interopRequireWildcard(require("./thought-controller"));
var auth = _interopRequireWildcard(require("../../services/auth-service"));
const router = _express.default.Router();
router.post('/thought', auth.requireLogin, controller.create);
router.get('/thought', controller.index);
router.put('/thought', auth.requireLogin, controller.update);
router.delete('/thought', auth.requireLogin, auth.requireLogin, controller.remove);
router.get('/thought/:id', controller.show);
router.put('/thought/:id/likes', auth.requireLogin, controller.updateLikes);
var _default = router;
exports.default = _default;