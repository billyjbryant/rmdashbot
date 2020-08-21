const DISCORD = require("discord.js");

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
 * Defines Discord Namespace
 */
let self = {};
self.namespace = "discord";

/**
 *  Define Discord Options
 */
const options = {
  token: process.env.DISCORD_BOT_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID
};

/**
 * Declares Discord Client
 */
self.client = new DISCORD.Client(options);

/**
 * Starts the Discord Bot
 */
self.start = function () {
  console.log(`Discord Bot Client ID is ${options.clientId}`);

  self.client.login(options.token);
  self.client.on("ready", () => {
    console.info(`* Logged in to Discord as ${self.client.user.tag}!`);
  });
  self.client.on("message", onMessageHandler);
};

/**
 * Stops the Discord Bot
 */
self.stop = function () {
  self.client.logout();
};

/**
 * Discord Handler Functions
 */

/**
 * Handle Discord Message Events
 *
 * @param {STRING} channel - Channel message originated in
 * @param {OBJECT} context - User Context for message origin
 * @param {STRING} msg - Message
 * @param {OBJECT} self
 */
function onMessageHandler(msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  if (!msg.guild && !msg.author.bot) {
    return; 
  }

  if (msg.content.startsWith("!")) {
    const messageRegex = /^\!(\w*)\s?(.*)?$/i;
    const message = msg.content.match(messageRegex);
    const commandName = message[1].toLowerCase();
    const commandText = message[2] ? message[2] : null;
    // If the command is known, let's execute it
    if (commands.discord[commandName]) {
      response = commands.discord[commandName](commandText,msg,msg.channel);
    } else if (commands.common[commandName]) {
      response = commands.common[commandName](commandText,msg,msg.channel,"discord");
    } else {
      response = commands.common.execute(commandName,commandText,msg,msg.channel,"discord");
    }
    if (response) {
      msg.reply(response);
    }
  } else {
    if (config.global.discord["cross-chat"].includes(msg.channel.id)) {
      helpers.crosschat.sendToTwitch(config, msg);
    }
  }
}

/**
 * Export the functions assigned to self
 */
module.exports = self;
