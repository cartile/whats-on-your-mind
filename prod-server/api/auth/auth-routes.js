"use strict";

var _interopRequireWildcard = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireWildcard.js").default;
var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var controller = _interopRequireWildcard(require("./auth-controller"));
const router = _express.default.Router();
router.post('/auth', controller.index);
var _default = router;
exports.default = _default;