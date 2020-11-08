// loading message commands

const fs = require('fs');
const nest = require('../tamagochi/nest.js');
const botCommands = {};

fs.readdir('./commands/', (err, files) => {
  files.forEach(file => {
    let cmd = require(`../commands/${file}`)
    let cmd_name = file.split('.')[0]
    botCommands[cmd_name] = cmd
  })
})


module.exports = (client, msg) => {
  if (msg.author.tag == client.user.tag) {
    return; // ignoring my own messages to avoid infinite loops
  }

  // Bot reacts if the message is a DM, or if the bot is directly mentioned
  if (msg.channel.type === "dm" || msg.isMentioned(client.user)) {

    // Will find the first command in the message and execute it
    let tokens = msg.content.split(" ");
    for (var _ of tokens) {
      if (_[0] == "!") {
        let cmd = _.slice(1);
        if (cmd in botCommands) {

          let egg = nest.get(msg.author.id);
          if (botCommands[cmd].requires_egg && typeof egg == 'undefined') {
            return msg.reply("You don't have an egg! Create one first with `!ask`.");
          }

          return botCommands[cmd].act(msg, egg)

        } else {
          return msg.reply(`Hey, I don't know this command, ${_}. Maybe try \`!help\` ?`);
        }
      }
    }

    return msg.reply("Hello there! Ask me for a list of commands with `!help`");
  }

};
