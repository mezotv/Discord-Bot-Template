const { readdir } = require("fs");

module.exports = async (client) => {
  readdir("./src/event", (err, files) => {
    if (err) return console.error(err); 
           
    files.forEach((file) => {
console.log(files)
      const event = require(`./src/event/${file}`);
     let eventName = file.split(".")[0];
      client.on(eventName, event.bind(client));
    });
  });
};
