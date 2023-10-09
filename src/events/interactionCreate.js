module.exports = (client, interaction) => {
  if (interaction.isChatInputCommand()) {
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
  } else if (interaction.isButton()) {

    const button = client.buttons.get(interaction.customId);
    try {
      button.execute(interaction, client);
    } catch (err) {
      if (err) console.error(err);
      interaction.reply({
        content: "An error occurred while trying to execute this button.",
        ephemeral: true,
      });
    }
  } else {
    const button = client.buttons.get(interaction.customId);
    if (button) return button.execute(interaction, client);
  }
};
