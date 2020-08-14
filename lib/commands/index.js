/**
 * Commands Namespace
 */

let self = {};
self.namespace = "commands";

self.common = require("./common");
self.twitch = require("./twitch");
self.discord = require("./discord");


/**
 * Export the functions assigned to self
 */
module.exports = self;
