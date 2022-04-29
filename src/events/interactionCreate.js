const { readdirSync } = require("fs");

module.exports = (interaction) => {

  const client = interaction.client;
  const commandFiles = readdirSync("./src/commands/").filter((file) =>
    file.endsWith(".js")
  );
  const commands = [];
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    command.execute(interaction, client);
  } catch (err) {
    if (err) console.error(err);
    interaction.reply({
      content: "An error occurred while executing that command.",
      ephemeral: true,
    });
  }
};
