const { Client, GatewayIntentBits } = require('discord.js');

/* Misc */
console.clear();

/* Initialize client */
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
    ],
});

const boilerplateComponents = async () => {
  await require('./util/boilerplateClient')(client);
}

boilerplateComponents();