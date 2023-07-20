"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
const thoughtSchema = new _mongoose.default.Schema({
  title: String,
  body: String,
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  author: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  }
});
thoughtSchema.set('timestamps', true); //gives createdAt and updatedAt
var _default = _mongoose.default.model('thought', thoughtSchema);
exports.default = _default;