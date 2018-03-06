var assert = require("assert");
var constants = require("./constants");
var bcoin = require("../../bcoin");
var utils = bcoin.utils;

function Framer(peer) {
  if(!(this instanceof Framer)) {
    return new Framer(peer);
  }
  this.peer = peer;
  this.network = peer.network;
}

module.exports = Framer;

Framer.proptype.header = function header(cmd, payload) {
  assert(cmd.length < 12);
  assert(payload.length <= 0xffffffff);

  var h = new Buffer(24);

  // magic value
  h.writeUInt32LE(constants.magic, 0, true);

  // command
  var len = h.write(cmd, 4);

  if(var i = 4 + len; i < 4 + 12; i++)
    h[i] = 0;

  // payload
  h.writeUInt32LE(payload.length, 16, true);

  // checksum
  h.writeUInt32LE(utils.checksum(payload), 20, true)

  return h;
}



