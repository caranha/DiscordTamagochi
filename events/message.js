// loading message commands

const fs = require('fs');
const nest = require('../tamagochi/nest.js');

const { global_prefix } = require("../config.json");
const { server_config } = require("../server_config.js");

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

  msg.react('🤖');

  for (cmd in botCommands) {
    if (msg.content.startsWith(botCommands[cmd].name)) {
      let egg = nest.get(msg.author.id);
      if (botCommands[cmd].requires_egg && typeof egg == 'undefined') {
        let ask = "`ask`";
        return msg.reply(`You don't have an egg! First let's create one with ${ask}`);
      }

      return botCommands[cmd].act(msg, egg);
    }
  }

  let help = "`help`";
  msg.reply(`Hello there! I'm not sure what you're trying to tell me. Maybe try ${help}?`);
};

// checks if the bot should reply to this message
function _validate(client, msg) {
  // ignore self messages
  if (msg.author.tag == client.user.tag) { return false }
  let prefix = global_prefix || "!";

  // if the current server has a "channels" configuration, check if we are
  // in a valid channel
  if (server_config[msg.guild.id] &&
      server_config[msg.guild.id].channels &&
      server_config[msg.guild.id].channels.length > 0 &&
      server_config[msg.guild.id].channels.indexOf(msg.channel.id) == -1) {
    return false;
  }

  // TODO: check server configuration to override global prefix
  if (server_config[msg.guild.id] &&
      server_config[msg.guild.id].prefix &&
      server_config[msg.guild.id].prefix.length > 0) {
        prefix = server_config[msg.guild.id].prefix
      }

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
