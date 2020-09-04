/**
 * Define CrossChat Namespace
 */
let crosschat = {};
crosschat.namespace = "crosschat";

/**
 * sendToTwitch Function - Sends chat to Twitch from Discord
 * 
 * @param {OBJECT} config - Bot Configuration Setting
 * @param {OBJECT} message - Message object from Discord
 */
crosschat.sendToTwitch = function (client, config, message) {
  const channelId = message.channel.id;
  const channelName = message.channel.name;
  const content = message.content;
  const userName = message.author.username;
  const messageText = `[${channelName}:${userName}] ${content}`;
  client.say(config.global.twitch.channels[0], messageText);
};

/**
 * sendToDiscord Function - Sends chat to Discord from Twitch
 * 
 * @param {OBJECT} config - Bot Configuration Setting
 * @param {OBJECT} context - Context of the Twitch Message
 * @param {OBJECT} message - Message object from Twitch
 */
crosschat.sendToDiscord = function (client, config, context, message) {
  console.debug({context: context, message: message});
  const author = context.author;
  const channelName = message.channel.name;
  const content = message.content;
  const userName = author.username;
  const messageText = `[${channelName}:${userName}] ${content}`;
  client.say(config.global.twitch.channels[0], messageText);
};

/**
 * Export the functions assigned to self
 */
module.exports = crosschat;
