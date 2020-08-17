const https = require("https");

/**
 * Define Common Commands Namespace
 */
let self = {};
self.namespace = "common";

/**
 * Configuring common variables
 */
const social = config.common.social;
const donate = config.common.donate;
const botrepo = process.env.npm_package_homepage;

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
    const roll = rollDice(commandText);
    if (source == "twitch") {
      return `@${sender}, ${roll}`;
    } else {
      return roll;
    }
  } else if (commandName === "discord" && social.discord) {
    return `Join us at in Discord at ${social.discord} !`;
  } else if (commandName === "youtube" && social.youtube) {
    return `Subscribe on YouTube at ${social.youtube} !`;
  } else if (commandName === "twitter" && social.twitter) {
    return `Follow me on Twitter at ${social.twitter}`;
  } else if (commandName === "instagram" && social.instagram) {
    return `Follow me on Instagram at ${social.instagram}`;
  } else if (commandName === "facebook" && social.facebook) {
    return `Follow me on Facebook at ${social.facebook}`;
  } else if (commandName === "tiktok" && social.tiktok) {
    return `Follow me on TikTok at ${social.tiktok}`;
  } else if (commandName.match(/^(donate|tip|tipjar|donation)$/)) {
    return `If you would like to help the stream or show your appreciation, feel free to throw some tips in the Tip Jar at ${donate.tipjar}`;
  } else if (commandName === "social" && social) {
    return `Stay up to date! Follow me on Twitter: ${social.twitter}, Subscribe on YouTube: ${social.youtube}, Follow me on Instagram: ${social.instagram}`;
  } else if (commandName === "repo" && botrepo) {
    return `You can contribute to the bot @ ${botrepo} !`;
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
};

function isTwitch(context, channel) {
  if (context && channel) return true;
  return false;
}

// Function called when the "dice" command is issued
function rollDice(params = null) {
  let num = 2; let die = "D6";
  const pool = (params) ? params.split(" ") : null;
  if (pool) { 
    if (pool[0].match(/(?:\b|-)([1-9]{1,2}[0]?|100)\b/)) {
      num = pool[0];
    } else { return `You must choose a number of dice between 1 and 100!`; }
    if (pool[1]) {
        if (pool[1].match(/[Dd](\d{0,2}[02468]|[1257])/)) {
        die = pool[1].toUpperCase();
        if (die.substr(1) > 100) { return `Sorry, I don't have any ${die}s!`; }
      } else { return `Sorry, ${pool[1]}s don't exist!`; }
    }
  }
  const sides = parseInt(die.substr(1));
  let total = 0;
  let counter = 0;
  while (counter < num) {
    const roll = Math.floor(Math.random() * sides) + 1;
    total = total+roll;
    counter++;
  }
  const roll = `you rolled ${num} ${die} and got ${total}! 🎲`;
  return roll;
}

/**
 * Export the functions assigned to self
 */
module.exports = self;
