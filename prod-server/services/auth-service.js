"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = generateJWT;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function generateJWT(user) {
  const tokenData = {
    username: user.username,
    id: user._id
  };
  return _jsonwebtoken.default.sign({
    user: tokenData
  }, process.env.TOKEN_SECRET);
}