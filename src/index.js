/* Requiring the nedded libarys*/
const { Collection, Client } = require("discord.js");

require("dotenv").config();

/* It's creating a new client with the needed intents. */
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_BANS",
    "GUILD_MEMBERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
});
module.exports = client;

/* Basically loading the even and command loader ironic right */
require("./util/eventLoader")(client);


/* It's creating a new collection for the commands. */

client.commands = new Collection();

/* Logging the bot in. */
client.login(process.env.TOKEN);
