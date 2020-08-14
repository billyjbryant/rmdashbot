const Enmap = require("enmap");

/**
 * Enmap default settings
 */
module.exports = {
  settings: new Enmap({
    name: "settings",
    autoFetch: true,
    fetchAll: false,
    cloneLevel: "deep",
  }),
  users: new Enmap("users"),
  tags: new Enmap({ name: "tags" }),
  defaultDiscordSettings: {
    prefix: "!",
    modRole: "Mod",
    adminRole: "Admin",
    logChannel: "Audit",
    welcomeChannel: "welcome",
  },
  defaultTwitchSettings: {
    prefix: "!",
  },
  global: (process.env.NODE_ENV == "production") ? require("./config.prod.json") : require("./config.dev.json"),
};