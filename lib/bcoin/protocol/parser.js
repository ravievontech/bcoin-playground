var assert = require("assert");
var util = require("util");
var Transform = require("stream").Transform;
var bspv = require("../../bspv");
var utils = bspv.utils;
var constans = require("./constants");

function Parser(peer) {
  if(!(this instanceof Parser)) {
    return new Parser(peer);
  }
  Transform.call(this);
  this._readableState.objectMode = true;

  this.peer = peer;
  this.pending = [];
  this.pendingTotal = 0;
  this.waiting = 24;
  this.packet = null;
}

util.inherits(Parser, Transform);
module.exports = Parser;

Parser.prototype._transform = function transform(data, enc, cb) {
  if(data) {
    this.pendingTotal += data.length;
    this.pending.push(data);
  }
  while(this.pendingTotal >= this.waiting) {
    var chunks =
  }

------------------------------- Work in progress
};

