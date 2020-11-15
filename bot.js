const fs = require('fs');              // file utilities

// load local configurations
const config = require('./config.json');   // authentication token, global prefix
require('./server_config.js');

// load tamagochi file
const nest = require('./tamagochi/nest.js')



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
