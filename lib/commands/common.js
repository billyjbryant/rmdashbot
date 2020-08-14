const https = require("https");

/**
 * Define Common Commands Namespace
 */
let self = {};
self.namespace = "common";

/**
 * Execute Command
 *
 * @param {STRING} commandName The command that was passed
 * @param {STRING} commandText The command arguments
 * @param {OBJECT} context The context of the command message
 * @param {STRING} channel The channel name where the command was issued
 * @param {STRING} source The source of the command (Twitch/Discord)
 */
self.execute = function (commandName, commandText, context, channel, source) {
  let streamer;
  let sender;
  let message;
  if (source == "twitch") {
    streamer = channel.substring(1).toLowerCase();
    sender = context.username.toLowerCase();
  } else {
    message = context;
    sender = message.author.username;
  }
  if (commandName === "dice") {
    const num = rollDice();
    const roll = `you rolled a ${num}! 🎲`;
    if (source == "twitch") {
      return `@${sender}, ${roll}`;
    } else {
      return roll;
    }
  } else if (commandName === "discord") {
    const discordURL = "https://rmdash.fr/discord";
    return `Join us at in Discord at ${discordURL} !`;
  } else if (commandName === "youtube") {
    const youtubeURL = "https://billyjbryant/youtube";
    return `Watch past streams at ${youtubeURL} !`;
  } else if (commandName === "github") {
    const githubURL = "https://github.com/billyjbryant/rmdashbot";
    return `You can contribute to the bot @ ${githubURL} !`;
  } else if (commandName === "social") {
    return `Stay up to date! Follow me on Twitter - https://twitter.com/billyjbryant, Subscribe on YouTube - https://billyjbryant.com/youtube, Follow me on Instagram - https://instagram.com/billyjbryant!!`;
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
};

function isTwitch(context, channel) {
  if (context && channel) return true;
  return false;
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Export the functions assigned to self
 */
module.exports = self;
