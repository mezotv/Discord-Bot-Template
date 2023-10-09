const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the clients ping"),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#5865f4")
      .setTitle("🏓  Pong!")
      .addFields({
        name: "**Api** latency",
        value: `> **${Math.round(client.ws.ping)}**ms`,
        inline: false,
      })
      .setTimestamp();

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Discord Ping")
        .setStyle(5)
        .setEmoji("💻")
        .setURL("https://discordstatus.com/"),
        new ButtonBuilder()
        .setLabel("Test")
        .setCustomId("ping") // this needs to match the data inside the button file
        .setStyle(1)
        .setEmoji("⚠️")
    );

    await interaction.reply({
      embeds: [pingembed],
      components: [button],
    });
  },
};
