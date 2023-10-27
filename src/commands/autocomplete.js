const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autocomplete")
    .setDescription("A simple autocomplete command!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to search for.")
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = [
      "Would You Rather",
      "Never Have I Ever",
      "Trivia",
      "Truth or Dare",
      "What would you do",
    ];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction, client) {
    // How to work with the value of the autocomplete
    switch (interaction.options.getString("input")) {
      case "Would You Rather":
        console.log("Would You Rather");
        break;
      case "Never Have I Ever":
        console.log("Never Have I Ever");
        break;
      case "Trivia":
        console.log("Trivia");
        break;
      case "Truth or Dare":
        console.log("Truth or Dare");
        break;
      case "What would you do":
        console.log("What would you do");
        break;
    }

    await interaction.reply({
      content:
        "This is a simple autocomplete command!" +
        "\nYou picked: " +
        interaction.options.getString("input"),
    });
  },
};
