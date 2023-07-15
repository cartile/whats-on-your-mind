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
async function index(req, res) {
  //find all thoughts
  try {
    const thoughts = await _thoughtModel.default.find().populate('author', 'username', 'user');
    return res.status(200).json({
      thoughts: thoughts
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
}
async function create(req, res) {
  // create thought
  try {
    const id = 0;
    const user = await _userModel.default.findOne({
      _id: id
    }).exec();
    if (!user) {
      return res.status(500).json();
    }
    const thought = new _thoughtModel.default(req.body.thought);
    thought.author = user._id;
    await thought.save();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json();
  }
}
async function update(req, res) {
  try {
    const id = 0;
    const user = await _userModel.default.findOne({
      _id: id
    }).exec();
    if (!user) {
      return res.status(404).json();
    }
    const thought = req.body.thought;
    thought.author = user._id;
    await _thoughtModel.default.findByIdAndUpdate({
      _id: thought._id
    }, thought).exec();
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
}
async function remove(req, res) {
  try {
    const id = 5;
    const thought = await _thoughtModel.default.findOne({
      _id: req.params.id
    }).exec();
    if (!thought) {
      return res.status(404).json();
    }
    if (thought.author._id.toString() !== id) {
      return res.status(403).json({
        message: 'You can only delete your own tasks.'
      });
    }
    await _thoughtModel.default.deleteOne({
      _id: req.params.id
    }).exec();
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
}
async function show(req, res) {
  // get thought via id
  try {
    const thought = await _thoughtModel.default.findOne({
      _id: req.params.id
    });
    if (!thought) {
      return res.status(404).json();
    }
    return res.status(200).json({
      thought: thought
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
}