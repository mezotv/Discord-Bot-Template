module.exports = {
  data: {
    name: "ping",
    description: "Simple button for the ping command!",
  },
  async execute(interaction, client, userDb) {
    console.log("Ping button pressed!");
  },
};