const TWITCH = require("tmi.js");
const DISCORD = require("./discord");

/**
 * Import the Command Modules
 */
const commands = require("./commands");

/**
 * Import Helpers
 */
const helpers = require("./helpers");

/**
 * Import Configuration Settings
 */
const config = require("../config/config");

/**
 * Defines Twitch Namespace
 */
let twitch = {};
twitch.namespace = "twitch";

/**
 * Define Twitch Options
 */
const options = {
  options: {
    clientId: process.env.TWITCH_CLIENT_ID,
    debug: process.env.DEBUG,
  },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_OAUTH,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: config.global.twitch.channels,
  bots: config.global.twitch.bots
};

/**
 * Declares Twitch Client
 */
twitch.client = new TWITCH.client(options);

/**
 * Starts the Twitch Bot
 */
twitch.start = function () {
  // Register our event handlers (defined below)
  twitch.client.on("message", onMessageHandler);
  twitch.client.on("connected", onConnectedHandler);

  // Connect to Twitch:
  twitch.client.connect();
};

/**
 * Stops the Twitch Bot
 */
twitch.stop = function () {
  // Disconnect from Twitch
  twitch.client.disconnect();
};

/**
 * Twitch Handler Functions
 */

/**
 * Handle Twitch Message Events
 *
 * @param {STRING} channel - Channel message originated in
 * @param {OBJECT} context - User Context for message origin
 * @param {STRING} msg - Message
 * @param {OBJECT} self
 */
async function onMessageHandler(channel, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  let response;
  const author = context.username;
  if (msg.startsWith("!")) {
    const messageRegex = /^\!(\w*)\s?(.*)?$/i;
    const message = msg.match(messageRegex);
    const commandName = message[1].toLowerCase();
    const commandText = message[2] ? message[2] : null;
    // If the command is known, let's execute it
    if (commands.twitch[commandName]) {
      response = commands.twitch[commandName](commandText, context, channel);
    } else if (commands.common[commandName]) {
      response = await commands.common[commandName](commandText,context,channel,"twitch");
    } else {
      response = commands.common.execute(commandName,commandText,context,channel,"twitch");
    }
    if (response) {
      twitch.client.say(channel, response);
    }
  } else {
    if (!options.bots.includes(author.username)) {
      return false;
      /* helpers.crosschat.sendToTwitch(TWITCH.client, config, msg); */
    }
  }
}

/**
 * Handles connections to Twitch Server
 *
 * @param {STRING} addr
 * @param {INT} port
 */
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

/**
 * Export the functions assigned to self
 */
module.exports = twitch;
