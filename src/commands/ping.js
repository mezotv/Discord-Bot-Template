const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot's ping status"),

  async execute(interaction, client) {
    const pingembed = new MessageEmbed()

      .setColor("#5865f4")
      .setTitle(":ping_pong:  Pong!")
      .addFields(
        {
          name: "**Api** latency",
          value: `> **${Math.round(client.ws.ping)}**ms`,
          inline: false,
        }
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [pingembed]
    });
  },
};
