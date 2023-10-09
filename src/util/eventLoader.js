const { readdir } = require("fs");
const { ChalkAdvanced } = require("chalk-advanced");

module.exports = class EventHandler {
  constructor(client) {
    this.client = client;
  }

  load() {
    readdir("./src/events/", (err, files) => {
      if (err) return console.error(err);

      for (let file of files) {
        console.log(
          `${ChalkAdvanced.white("Boilerplate Bot")} ${ChalkAdvanced.gray(
            ">"
          )} ${ChalkAdvanced.green(
            `Loaded event: ${ChalkAdvanced.white(file)}`
          )}`
        );
        const event = require("../events/" + file);
        let eventName = file.split(".")[0];

        this.client.on(eventName, event.bind(null, this.client));
      }
    });
  }
};
