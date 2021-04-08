const https = require("https");
const tts = require("./twitch/tts");

/**
 * Define Twitch Commands Namespace
 */
let self = {};
self.namespace = "twitch";

/**
 * Greeting Command
 * 
 * @param {STRING} commandText 
 * @param {OBJECT} context 
 * @param {OBJECT} channel 
 */
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

self.shoutout = function (commandText, context, channel) {
  let streamer;
  let sender;
  let message;
  streamer = channel.substring(1).toLowerCase();
  sender = context.username.toLowerCase();
  if (!commandText) return `You didn't tell me who to shout-out!`;
  const user = commandText;
  return `Lets give a shoutout to ${user}! Go follow them at https://twitch.tv/${user}`;
};
self.so = self.shoutout;

/*self.say = function ( commandText, context, channel) {
  console.log({context: context});
  let streamer;
  let sender;
  let message;
  streamer = channel.substring(1).toLowerCase();
  sender = context.username.toLowerCase();
  if (!commandText) return;
  tts.speak(commandText);
  console.log(`Said ${commandText}`);
  return;
}
*/

function grabClip(channel, apikey) {
  if (channel && apikey) {
    clipurl = `https://api.twitch.tv/helix/clips?broadcaster_id=${channel}`;
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
