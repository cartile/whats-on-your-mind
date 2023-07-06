"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _thoughtRoutes = _interopRequireDefault(require("./api/thought/thought-routes.js"));
function registerRoutes(app) {
  app.use('/api', _thoughtRoutes.default);
}
var _default = registerRoutes;
exports.default = _default;