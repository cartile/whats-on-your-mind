"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
var _stringUtil = require("../../utilities/string-util");
function index(req, res) {
  const validation = validateIndex(req.body);
  if (!validation.isValid) {
    return res.json({
      message: validation.message
    });
  }
  return res.json();
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