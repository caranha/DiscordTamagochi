// loading message commands

const fs = require('fs');
const nest = require('../tamagochi/nest.js');

const { global_prefix } = require("../config.json")
const prefix = global_prefix || "!";

const botCommands = {};

fs.readdir('./commands/', (err, files) => {
  files.forEach(file => {
    let cmd = require(`../commands/${file}`)
    let cmd_name = file.split('.')[0]
    botCommands[cmd_name] = cmd
  })
})


module.exports = (client, msg) => {

  // Check if I should listen to this message (has prefix, is DM, etc.)
  if (!_validate(client, msg)) {
    return;
  }

  // Prefix has already been removed. Check each known command.
  // TODO: replace the global prefix with the server prefix if necessary

  for (cmd in botCommands) {
    if (msg.content.startsWith(botCommands[cmd].name)) {
      let egg = nest.get(msg.author.id);
      if (botCommands[cmd].requires_egg && typeof egg == 'undefined') {
        let ask = "`"+prefix+"ask`";
        return msg.reply(`You don't have an egg! First let's create one with ${ask}`);
      }

      return botCommands[cmd].act(msg, egg);
    }
  }

  let help = "`"+prefix+"help`";
  msg.reply(`Hello there! I'm not sure what you're trying to tell me. Maybe try ${help}?`)

};

// checks if the bot should reply to this message
function _validate(client, msg) {
  // ignore self messages
  if (msg.author.tag == client.user.tag) { return false }

  // TODO: check server configuration to ignore messages certain channels

  // TODO: check server configuration to override global prefix

  // reply to the prefix (TODO: if the user configured a personal prefix, check that too)
  if ((msg.content.startsWith(prefix))) {
    msg.content = msg.content.slice(prefix.length).trim();
    return true;
  }



  // reply to DMs and mentions
  if (msg.channel.type === "dm") { return true }

  if (msg.isMentioned(client.user)) {
    if (msg.content.startsWith(`<@!${client.user.id}>`)) {
      msg.content = msg.content.slice(`<@!${client.user.id}>`.length).trim()
    }
    return true;
  }

  return false;
}
