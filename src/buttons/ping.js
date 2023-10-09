module.exports = {
  data: {
    name: "ping",
    description: "Simple button for the ping command!",
  },
  async execute(interaction, client) {
    console.log("Ping button pressed!");
  },
};