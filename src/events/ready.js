const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();
const { ChalkAdvanced } = require("chalk-advanced");

module.exports = async (client) => {
  const commandFiles = readdirSync("./src/commands/").filter((file) =>
    file.endsWith(".js"),
  );

  const commands = [];

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const rest = new REST({
    version: "10",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === "PRODUCTION") {
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: commands,
        });
        console.log(
          `${ChalkAdvanced.white("Boilerplate Bot")} ${ChalkAdvanced.gray(
            ">",
          )} ${ChalkAdvanced.green(
            "Successfully registered commands globally",
          )}`,
        );
      } else {
        await rest.put(
          Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
          {
            body: commands,
          },
        );

        console.log(
          `${ChalkAdvanced.white("Boilerplate Bot")} ${ChalkAdvanced.gray(
            ">",
          )} ${ChalkAdvanced.green(
            "Successfully registered commands locally",
          )}`,
        );
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();
  client.user.setPresence({
    activities: [{ name: process.env.STATUSBOT }],
    status: process.env.DISCORDSTATUS,
  });
};
