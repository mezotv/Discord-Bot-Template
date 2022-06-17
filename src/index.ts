import { Client, Intents } from 'discord.js';

/* Misc */
console.clear();

/* Initialize client */
const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGES
    ],
});

const boilerplateComponents = async () => {
  await require('./util/boilerplateClient')(client);
}

boilerplateComponents();