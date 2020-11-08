const fs = require('fs');              // file utilities
const nest = require('./tamagochi/nest.js') // load tamagochi file
const config = require('./config.json');   // authentication token

// var memory = require('./utils/memory.js');
// setInterval(memory.save, 1000*60); // saving the memory once every minute

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
