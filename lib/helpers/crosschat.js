const DISCORD = require("../discord");
const TWITCH = require("../twitch");

/**
 * Define CrossChat Namespace
 */
let self = {};
self.namespace = "crosschat";

/**
 * sendToTwitch Function - Sends chat to Twitch from Discord
 * 
 * @param {object} config - Bot Configuration Setting
 * @param {object} message - Message object from Discord
 */
self.sendToTwitch = function (config, message) {
  const channelId = message.channel.id;
  const channelName = message.channel.name;
  const content = message.content;
  const userName = message.author.username;
  const messageText = `[${channelName}:${userName}] ${content}`;
  TWITCH.client.say(config.global.twitch.channels[0], messageText);
};

/**
 * sendToDiscord Function - Sends chat to Twitch from Discord
 * 
 * @param {object} config - Bot Configuration Setting
 * @param {object} message - Message object from Discord
 */
self.sendToDiscord = function (config, context, message) {
  console.debug({context: context, message: message});
  const author = context.author;
  const channelId = message.channel.id;
  const channelName = message.channel.name;
  const content = message.content;
  const userName = author.username;
  const messageText = `[${channelName}:${userName}] ${content}`;
  DISCORD.client.say(config.global.twitch.channels[0], messageText);
};

/**
 * Export the functions assigned to self
 */
module.exports = self;
