const https = require("https");

/**
 * Define Discord Commands Namespace
 */
let self = {};
self.namespace = "discord";

self.greet = function (commandText, message, channel = null) {
  let sender = message.author.username;
  if (!commandText) return `You didn't tell me who to greet!`;
  const greetRegex = /([\w\d@\+_]{1,})\s?(.*)/i;
  const greetMatch = commandText.match(greetRegex);
  const greeting = greetMatch[2] ? greetMatch[2] : "LUL";
  const mentions = message.mentions;
  const user = mentions.users.first();
  console.debug({user: user});
  // If we have a user mentioned
  if (user) {
    // Now we get the member from the user
    const member = message.guild.member(user);
    // If the member is in the guild
    if (member) {
      channel.send(`Welcome to ${channel}, ${user.toString()}!`);
      return false;
    }
  }
};

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}


/**
 * Export the functions assigned to self
 */
module.exports = self;
