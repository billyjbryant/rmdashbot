const https = require("https");

/**
 * Define Twitch Commands Namespace
 */
let self = {};
self.namespace = "twitch";

self.greet = function (commandText, context, channel) {
  let streamer;
  let sender;
  let message;
  streamer = channel.substring(1).toLowerCase();
  sender = context.username.toLowerCase();
  if (!context.subscriber && !context.mod && !sender.match(streamer)) {
    return;
  }
  if (!commandText) return `You didn't tell me who to greet!`;
  const greetRegex = /([\w\d@\+_]{1,})\s?(.*)/i;
  const greetMatch = commandText.match(greetRegex);
  console.debug(`Greet 1: ${greetMatch}`);
  const greeting = greetMatch[2] ? greetMatch[2] : "LUL";
  const user = greetMatch[1];
  return `Welcome to the channel, ${user}! ${greeting}!`;
};

function grabClip(channel, apikey) {
  if (channel && apikey) {
    clipurl = `https://api.twitch.tv/helix/clips?broadcaster_id=`;
    https
      .get(clipurl, (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          console.log(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  }
}

/**
 * Export the functions assigned to self
 */
module.exports = self;
