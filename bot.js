const env = require("dotenv");

/**
 * Load Environment Variables
 */
env.config();

/**
 * Import Configuration Settings
 */
global.config = (process.env.NODE_ENV == "production") ? require("./config/config.prod.json") : require("./config/config.dev.json");
console.log(`Environment [${process.env.NODE_ENV}] Loaded`);

/**
 * Import the Bot Modules
 */
const discord = require("./lib/discord");
const twitch = require("./lib/twitch");

/**
 * Start the Twitch Bot
 */
twitch.start();

/**
 * Start the Discord Bot
 */
discord.start();
