"use strict";

var _interopRequireWildcard = require("D:/carti/Documents/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireWildcard.js").default;
var _interopRequireDefault = require("D:/carti/Documents/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var controller = _interopRequireWildcard(require("./register-controller"));
const router = _express.default.Router();
router.post('/register', controller.index);
var _default = router;
exports.default = _default;