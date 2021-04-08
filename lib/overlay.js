const events = require('events');

/**
 * Define Server Namespace
 */
let overlay = {};
overlay.namespace = "overlay";

/**
 * Configuring common variables
 */
const cfg = config.stream_overlay;
const options = {
  hostname: cfg.hostname,
  port: cfg.port,
  directory: cfg.endpoint,
  events: new events.EventEmitter()
};

/**
 * Declares Overlay Server
 * 
 */
overlay.server = new Overlay(options);

/**
 * Adds an Overlay
 */
overlay["commands"] = {};
overlay.commands.add = function (o, content) {
  console.log(content)
  const settings = overlay.types[o](content);
  overlay.server.add(settings);
  events.emit(`overlay:${o}:show`);
};

/**
 * Hides an Overlay
 */
overlay.commands.hide = function (o) {
  overlay.server.hide(`overlays:${o}:hide`);
};

/**
 * Removes an Overlay
 */
overlay.commands.remove = function (o) {
  overlay.server.remove(`overlays:${o}:remove`);
};

overlay["types"] = {};
/**
 * Defines the Gif overlay handler
 */
overlay.types['gif'] = function (content) {
  return {
    name: content.name,
    type: content.type,
    file: content.url
  }
}

/**
 * Export the functions assigned to self
 */
module.exports = overlay;






