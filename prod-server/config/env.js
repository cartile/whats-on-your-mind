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
  process.env.MONGO_URI = 'mongodb://localhost:27017/vue-db';
  process.env.TOKEN_SECRET = 'v7148fb9y5H5kv7-2Sce1fuEF8KdwSf8lzYdFPaHZFsag9pFifVk3d9VYlZqlu4XLyDiTEHMk7TyUIOHOJ5Xqc6w_ZUh5iwHuSJRaf_Qs0k6bHzrctR0sncc5GH_Ry9eencz0c9uoEA9Z7lit66Mae6O6ziXZJIbjgzi8vyalfF4QGesBz2E_a2rVwe5zl2XUeTue3fchqJkq8OsxMTUmUhGrgJsMzrUai3xJT8Xopji0RhK98hK4hzJR7lzWan1zWKlUjDG3xJUeyYxHoQFTE6aXAzQKd3XaVlul7uAHPalnNlFQ6QD2CGYZtUlXP1lSh_PNbn2_xi7MM4rdvOB3A';
  app.use(_bodyParser.default.json());
  app.use((0, _morgan.default)('dev'));
  app.use((0, _cors.default)());
}
function setProdEnv(app) {
  process.env.MONGO_URI = 'mongodb://localhost:27017/prod-db';
  process.env.TOKEN_SECRET = 'v7148fb9y5H5kv7-2Sce1fuEF8KdwSf8lzYdFPaHZFsag9pFifVk3d9VYlZqlu4XLyDiTEHMk7TyUIOHOJ5Xqc6w_ZUh5iwHuSJRaf_Qs0k6bHzrctR0sncc5GH_Ry9eencz0c9uoEA9Z7lit66Mae6O6ziXZJIbjgzi8vyalfF4QGesBz2E_a2rVwe5zl2XUeTue3fchqJkq8OsxMTUmUhGrgJsMzrUai3xJT8Xopji0RhK98hK4hzJR7lzWan1zWKlUjDG3xJUeyYxHoQFTE6aXAzQKd3XaVlul7uAHPalnNlFQ6QD2CGYZtUlXP1lSh_PNbn2_xi7MM4rdvOB3A';
  app.use(_bodyParser.default.json());
  app.use(_express.default.static(__dirname + '/../dist'));
}