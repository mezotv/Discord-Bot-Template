// Main Bot Library's
const {
  Client,
  GatewayIntentBits,
  Options,
  Collection,
} = require("discord.js");

require("dotenv").config();

const EventHandler = require("./eventLoader");

module.exports = class BoilerplateClient extends Client {
  constructor(customCacheOptions = {}) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
      ],
      makeCache: Options.cacheWithLimits({
        BaseGuildEmojiManager: 0,
        GuildBanManager: 0,
        GuildInviteManager: 0,
        GuildStickerManager: 0,
        PresenceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        CategoryChannelChildManager: 0,
        MessageManager: 0,
        ReactionManager: 0,
        ...customCacheOptions,
      }),
    });

    this.commands = new Collection();

    this.eventHandler = new EventHandler(this);
    this.eventHandler.load();
  }

  loginBot() {
    return this.login(process.env.TOKEN);
  }
};
