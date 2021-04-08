const axios = require("axios");
const qs = require("querystring");
//const overlay = require("../../overlay").commands;

/**
 * Define async Commands Namespace
 */
let self = {};
self.namespace = "async";

/**
 * Configuring common variables
 */
const giphy = config.giphy;
const gyfcat = config.gyfcat;

/**
 * Giphy Command Handler
 * Takes input from !gif <string> to display a gif on stream
 *
 * @param {STRING} commandName The command that was passed
 * @param {STRING} commandText The command arguments
 * @param {OBJECT} context The context of the command message
 * @param {STRING} channel The channel name where the command was issued
 * @param {STRING} source The source of the command (Twitch/Discord)
 */
self.gif = async function (commandText, context, channel, source) {
  if (source == "twitch") {
    const streamer = channel.substring(1).toLowerCase();
    const sender = context.username.toLowerCase();
    const response = await getGiphy(giphy, commandText).then(res => {
      let gif = [];
      gif["name"] = res.title;
      gif["url"] = res.images.original.mp4;
      gif["type"] = "video";
      console.log(gif);
      //overlay.add('gif', gif);
      return gif;
    })
    .catch(err => {
      const errmsg = `Unable to query Giphy API. Error Message: ${err}`
      return new Error(errmsg);
    })
  } else {
    const message = context;
    const sender = message.author.username;
  }
}

/**
 * Giphy Command Handler
 * Takes input from !gif <string> to display a gif on stream
 *
 */
async function getGiphy(giphy,searchTerm) {
  const giphy_api_key = process.env.GIPHY_API_KEY;
  const giphy_url = `https://${giphy.hostname}${giphy.endpoint}`;
  const query = qs.encode({
    api_key: giphy_api_key,
    q: searchTerm,
    limit: 1,
    rating: giphy.rating,
    lang: giphy.language
  })
  const query_url = `${giphy_url}?${query}`;
  const request = await axios.get(query_url).then(response => {
    if (response.data.data.length > 0) {
      return response.data.data[0];
    } else { return new Error(`Unable to retrieve images from Giphy, please try again!`); }
  })
  .catch(err => {
    const errmsg = `Unable to query Giphy API. Error Message: ${err}`
    return new Error(errmsg);
  })
  if (request) return request;
}

/**
 * Export the functions assigned to self
 */
module.exports = self;


