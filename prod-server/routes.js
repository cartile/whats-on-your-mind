"use strict";

var _interopRequireDefault = require("D:/carti/Documents/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _thoughtRoutes = _interopRequireDefault(require("./api/thought/thought-routes.js"));
var _registerRoutes = _interopRequireDefault(require("./api/register/register-routes"));
var _userRoutes = _interopRequireDefault(require("./api/user/user-routes"));
var _authRoutes = _interopRequireDefault(require("./api/auth/auth-routes"));
function registerRoutes(app) {
  app.use('/api', _thoughtRoutes.default);
  app.use('/api', _registerRoutes.default);
  app.use('/api', _userRoutes.default);
  app.use('/api', _authRoutes.default);
}
var _default = registerRoutes;
exports.default = _default;