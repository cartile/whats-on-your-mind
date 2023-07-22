"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
var _userModel = _interopRequireDefault(require("../../model/user-model"));
async function index(req, res) {
  try {
    const users = await _userModel.default.find({});
    return res.status(200).json({
      users
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
}
async function show(req, res) {
  try {
    const user = await _userModel.default.findOne({
      _id: req.params.id
    });
    if (!user) {
      return res.status(404).json();
    }
    return res.status(200).json({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
}