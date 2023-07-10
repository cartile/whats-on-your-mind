"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _stringUtil = require("../utilities/string-util");
const userSchema = new _mongoose.default.Schema({
  username: String,
  first: String,
  last: String,
  password: String
});
userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
  const first = _stringUtil.StringUtil.capitalize(this.first.toLowerCase());
  const last = _stringUtil.StringUtil.capitalize(this.last.toLowerCase());
  return `${first} ${last}`;
});
userSchema.pre('save', function (next) {
  this.username = this.username.toLowerCase();
  this.first = this.first.toLowerCase();
  this.last = this.last.toLowerCase();
  next();
});
var _default = _mongoose.default.model('user', userSchema);
exports.default = _default;