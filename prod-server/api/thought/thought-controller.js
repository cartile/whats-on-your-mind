"use strict";

var _interopRequireDefault = require("/Users/jeffwang/whats-on-your-mind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.index = index;
exports.remove = remove;
exports.show = show;
exports.update = update;
var _userModel = _interopRequireDefault(require("../../model/user-model"));
var _thoughtModel = _interopRequireDefault(require("../../model/thought-model"));
var _compilerCore = require("@vue/compiler-core");
var _shared = require("@vue/shared");
function index(req, res) {
  //find all thoughts
  _thoughtModel.default.find({}, (error, thoughts) => {
    if (error) {
      return res.status(500).json();
    }
    return res.status(200).json({
      thoughts: thoughts
    });
  }).populate('author', 'username', 'user');
}
function create(req, res) {
  // create thought
  const id = 0;
  _userModel.default.findOne({
    _id: id
  }, (error, user) => {
    if (error) {
      return res.status(500).json();
    }
    const thought = new _thoughtModel.default(req.body.thought);
    thought.author = user._id;
    thought.save(error => {
      if (error) {
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}
function update(req, res) {
  const id = 0;
  _userModel.default.findOne({
    _id: id
  }, (error, user) => {
    if (error) {
      return res.status(500).json();
    }
    if (!user) {
      return res.status(404).json();
    }
    const thought = req.body.thought;
    thought.author = user._id;
    _thoughtModel.default.findByIdAndUpdate({
      _id: thought._id
    }, thought, error => {
      if (error) {
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}
function remove(req, res) {
  const id = 5;
  _thoughtModel.default.findOne({
    _id: req.params.id
  }, (error, thought) => {
    if (error) {
      return res.status(500).json();
    }
    if (!thought) {
      return res.status(404).json();
    }
    if (thought.author._id.toString() !== id) {
      return res.status(403).json({
        message: 'You can only delete your own tasks.'
      });
    }
    _thoughtModel.default.deleteOne({
      _id: req.params.id
    }, error => {
      if (error) {
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}
function show(req, res) {
  // get thought via id
  _thoughtModel.default.findOne({
    _id: req.params.id
  }, (error, thought) => {
    if (error) {
      return res.status(500).json();
    }
    if (!thought) {
      return res.status(404).json();
    }
    return res.status(200).json({
      thought: thought
    });
  });
}