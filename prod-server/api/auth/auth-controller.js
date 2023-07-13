"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
var _stringUtil = require("../../utilities/string-util");
var _userModel = _interopRequireDefault(require("../../model/user-model"));
async function index(req, res) {
  // login method basically
  const validation = validateIndex(req.body);
  if (!validation.isValid) {
    return res.json({
      message: validation.message
    });
  }
  try {
    const user = await _userModel.default.findOne({
      username: req.body.username.toLowerCase()
    }).exec();
    if (!user) {
      return res.status(401).json();
    }
    const passwordsMatch = _userModel.default.passwordMatches(req.body.password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json();
    }
    return res.status(200).json();
  } catch (error) {
    console.log(error);
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
  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}