"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
var _stringUtil = require("../../utilities/string-util");
var _userModel = _interopRequireDefault(require("../../model/user-model"));
function index(req, res) {
  const validation = validateIndex(req.body);
  if (!validation.isValid) {
    return res.json({
      message: validation.message
    });
  }
  const user = new _userModel.default({
    username: req.body.username.toLowerCase(),
    password: req.body.password
  });
  user.save(error => {
    if (error) {
      if (error.code === 11000) {
        return res.status(403).json({
          message: 'Username is already taken.'
        });
      }
      return res.status(500).json();
    }
    return res.status(201).json();
  });
}
function validateIndex(body) {
  let errors = '';
  if (_stringUtil.StringUtil.isEmpty(body.username)) {
    errors += 'Please enter a username. ';
  }
  if (_stringUtil.StringUtil.isEmpty(body.password)) {
    errors += 'Please enter a password. ';
  }
  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}