"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEnvironment = setEnvironment;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
function setEnvironment(app) {
  if (process.env.NODE_ENV !== 'production') {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
}
function setDevEnv(app) {
  process.env.NODE_ENV = 'development';
  process.env.TOKEN_SECRET = 'temporary'
  process.env.MONGO_URI = 'mongodb://localhost:27017/vue-db';
  app.use(_bodyParser.default.json());
  app.use((0, _morgan.default)('dev'));
  app.use((0, _cors.default)());
}
function setProdEnv(app) {
  process.env.MONGO_URI = 'mongodb://localhost:27017/prod-db';
  app.use(_bodyParser.default.json());
  app.use(_express.default.static(__dirname + '/../dist'));
}