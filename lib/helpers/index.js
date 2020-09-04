/**
 * Commands Namespace
 */

let self = {};
self.namespace = "helpers";

self.crosschat = require("./crosschat").crosschat;

/**
 * Export the functions assigned to self
 */
module.exports = self;
