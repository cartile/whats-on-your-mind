"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToDB = connectToDB;
var _mongoose = _interopRequireDefault(require("mongoose"));
async function connectToDB() {
  try {
    await _mongoose.default.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to database', error);
    throw error;
  }
}