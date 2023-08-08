"use strict";

var _interopRequireWildcard = require("D:/carti/Documents/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireWildcard.js").default;
var _interopRequireDefault = require("D:/carti/Documents/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var controller = _interopRequireWildcard(require("./thought-controller"));
var auth = _interopRequireWildcard(require("../../services/auth-service"));
const apicache = require('apicache');
let cache = apicache.middleware;
const router = _express.default.Router();
router.post('/thought', auth.requireLogin, async (req, res) => {
  await controller.create(req, res);
  apicache.clear('/api/thoughts');
});
router.get('/thought', cache('5 minutes'), controller.index);
router.put('/thought', auth.requireLogin, async (req, res) => {
  await controller.update(req, res);
  apicache.clear('/api/thoughts');
});
router.delete('/thought/:id', auth.requireLogin, async (req, res) => {
  await controller.remove(req, res);
  apicache.clear('/api/thoughts');
});
router.get('/thought/:id', cache('5 minutes'), controller.show);
router.put('/thought/:id/likes', auth.requireLogin, controller.updateLikes);
// no cache for like updates because it modifies server state**
var _default = router;
exports.default = _default;