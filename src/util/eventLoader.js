const { readdir } = require("fs");

module.exports = class EventHandler {
  constructor(client) {
    this.client = client;
    this.once = ["ready"];
  }

  load() {
    readdir("./src/events/", (err, files) => {
      if (err) return console.error(err);

      files.forEach((file) => {
        const event = require(`../events/${file}`);
        let eventName = file.split(".")[0];

        if (this.once.includes(eventName)) {
          this.client.once(eventName, event.bind(null, this.client));
        } else {
          this.client.on(eventName, event.bind(null, this.client));
        }
      });
    });
  }
};
