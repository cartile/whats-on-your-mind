"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
const router = _express.default.Router();
router.post('/auth', (req, res) => {
  res.send('post.auth - login');
});
var _default = router;
exports.default = _default;