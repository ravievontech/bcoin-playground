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
};

// concat buffers 
Framer.proptype.packet = function packet(cmd, payload) {
  var h = this.header('version', payload);
  return Buffer.concat([h, payload], h.length + payload.length);
};

Framer.proptype._addr = function addr(buf, off, addr) {
};

Framer.prototype.version = function version() {
  var local = this.network.externalAddr;
  var remote = this.peer.addr;
  var p = new Buffer(86);
  p.writeUInt32LE(constants.version, 0, true);
  p.writeUInt32LE(constants.services.network, 4, true);
  p.writeUInt32LE(0, 8, true);

  this._addr(p, 20, remote);
  this._addr(p, 46, local);

  // No user-agent
  p[80] = 0;  

  // Start height
  p.writeUInt32LE(0x0, 81, true);

  // Relay
  p[85] = 0;

  return this.packet('version', p);
}















