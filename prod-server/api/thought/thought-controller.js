"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.index = index;
exports.remove = remove;
exports.show = show;
exports.update = update;
function index(req, res) {
  //find all tasks
  return res.json();
}
function create(req, res) {
  // create task
  return res.json();
}
function update(req, res) {
  //update task
  return res.json();
}
function remove(req, res) {
  // delete a task
  return res.json();
}
function show(req, res) {
  // get task via id
  return res.json();
}