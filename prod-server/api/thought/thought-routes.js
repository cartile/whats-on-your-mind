"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
const router = _express.default.Router();
router.post('/thought', (req, res) => {
  res.send('post.thoughts - create a thought');
});
router.get('/thought', (req, res) => {
  res.send('get.thoughts - get all thoughts');
});
router.get('/thought/:id', (req, res) => {
  const thoughtId = req.params.id;
  res.send(`get.thoughts/${thoughtId} - get thought by id`);
});
router.put('/thought', (req, res) => {
  res.send('put.thoughts - update a thought');
});
router.delete('/thought', (req, res) => {
  res.send('delete.thoughts - delete a thought');
});
var _default = router;
exports.default = _default;