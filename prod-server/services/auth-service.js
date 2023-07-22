"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeToken = decodeToken;
exports.generateJWT = generateJWT;
exports.getUserId = getUserId;
exports.getUsername = getUsername;
exports.requireLogin = requireLogin;
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
function requireLogin(req, res, next) {
  const token = decodeToken(req);
  if (!token) {
    return res.status(401).json({
      message: 'You must be logged in.'
    });
  }
  next();
}
function decodeToken(req) {
  const token = req.headers.authorization || req.headers['authorization'];
  if (!token) {
    return null;
  }
  try {
    return _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}
function getUsername(req) {
  const token = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.username;
}
function getUserId(req) {
  const token = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.id;
}