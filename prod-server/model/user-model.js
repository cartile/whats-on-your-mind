"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _stringUtil = require("../utilities/string-util");
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
const userSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    unique: true
  },
  first: String,
  last: String,
  password: String,
  likedPosts: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Thought'
  }]
});
userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
  const first = _stringUtil.StringUtil.capitalize(this.first.toLowerCase());
  const last = _stringUtil.StringUtil.capitalize(this.last.toLowerCase());
  return `${first} ${last}`;
});
userSchema.statics.passwordMatches = function (password, hashed) {
  return _bcryptNodejs.default.compareSync(password, hashed);
};
userSchema.pre('save', function (next) {
  this.username = this.username.toLowerCase();
  this.first = this.first.toLowerCase();
  this.last = this.last.toLowerCase();
  if (!this.isModified('password')) {
    return next(); // If password hasn't changed, skip password hashing
  }

  const plainPassword = this.password;
  this.password = _bcryptNodejs.default.hashSync(plainPassword);
  next();
});
var _default = _mongoose.default.model('user', userSchema);
exports.default = _default;