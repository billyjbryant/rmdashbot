const DISCORD = require("discord.js");

/**
 * Import the Command Modules
 */
const commands = require("./commands");

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
const discord = new DISCORD.Client(options);

/**
 * Starts the Discord Bot
 */
self.start = function () {
  console.log(`Discord Bot Client ID is ${options.clientId}`);

  discord.login(options.token);
  discord.on("ready", () => {
    console.info(`* Logged in to Discord as ${discord.user.tag}!`);
  });
  discord.on("message", onMessageHandler);
};

/**
 * Stops the Discord Bot
 */
self.stop = function () {
  discord.logout();
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
  }
}

/**
 * Export the functions assigned to self
 */
module.exports = self;
