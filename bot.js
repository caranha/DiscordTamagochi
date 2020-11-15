const fs = require('fs');              // file utilities

// authentication token
const config = require('./config.json');   // authentication token

// check if server configuration exists
try {
  const server_config = require('./server_config.json')
} catch(err) {
  if (err.message.startsWith("Cannot find module")) {
    fs.writeFileSync("server_config.json", JSON.stringify({}),
      function(err) { if (err) { console.log(err); } });
  } else {
    throw(err);
  }
}

const nest = require('./tamagochi/nest.js') // load tamagochi file



//////////////////////////////
// Initializing discord client
Discord = require('discord.js'); // nodejs discord library
client = new Discord.Client();

// Plugging event handlers (one file for each event on "events")
fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, (...args) => eventHandler(client, ...args))
  })
})

client.login(config.token);
/////////////////////////////
