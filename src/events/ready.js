const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();
const { ChalkAdvanced } = require("chalk-advanced");

module.exports = async (client) => {
  const commandFiles = readdirSync("./src/commands/").filter((file) =>
    file.endsWith(".js")
  );

  const commands = [];

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const CLIENT_ID = client.user.id;

  const rest = new REST({
    version: "9",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === "PRODUCTION") { // If the bot is in production mode it will load slash commands for all guilds
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        console.log(ChalkAdvanced.green("Successfully registered commands globally"));

      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          {
            body: commands,
          }
        );

        console.log(ChalkAdvanced.red("Successfully registered commands locally"));
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();
  client.user.setPresence({
    activities: [{ name: `${process.env.STATUSBOT}` }],
    status: "dnd",
  });
};
