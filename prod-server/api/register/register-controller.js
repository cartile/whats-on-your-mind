"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
var _stringUtil = require("../../utilities/string-util");
var _userModel = _interopRequireDefault(require("../../model/user-model"));
async function index(req, res) {
  const validation = validateIndex(req.body);
  if (!validation.isValid) {
    return res.json({
      message: validation.message
    });
  }
  try {
    const user = new _userModel.default({
      username: req.body.username,
      password: req.body.password,
      first: req.body.first,
      last: req.body.last
    });
    await user.save();
    return res.status(201).json();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(403).json({
        message: 'Username is already taken.'
      });
    }
    return res.status(500).json();
  }
}
function validateIndex(body) {
  let errors = '';
  if (_stringUtil.StringUtil.isEmpty(body.username)) {
    errors += 'Please enter a username. ';
  }
  if (_stringUtil.StringUtil.isEmpty(body.password)) {
    errors += 'Please enter a password. ';
  }
  if (_stringUtil.StringUtil.isEmpty(body.first)) {
    errors += 'Please enter a first name. ';
  }
  if (_stringUtil.StringUtil.isEmpty(body.last)) {
    errors += 'Please enter a last name. ';
  }
  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}