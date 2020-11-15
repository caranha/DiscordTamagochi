module.exports = {
  name: "serverconfig",
  desc: "Changes configuration for this server. Use `serverconfig` without anything for a list of configs, and `serverconfig <config>` without other options for details about that configuration.",
  usage: "`serverconfig <config> <option>`",
  requires_egg: false,
  category: "configuration",
  act,
}

const { server_config, save } = require("../server_config.js");
const { global_prefix } = require("../config.json");

function act(message, egg) {
  let tokens = message.content.trim().split(" ");
  let args = tokens.slice(tokens.indexOf(`serverconfig`)+1);

  if (args.length > 1 && message.guild.ownerID != message.author.id) {
    message.reply("I'm sorry, I can't let you do that. Only the server owner has config permissions.");
  }

  if (!server_config[message.guild.id]) {
    server_config[message.guild.id] = {"channels": [], "prefix": global_prefix};
  }



  switch (args[0]) {
    case "channels":

      let channels = server_config[message.guild.id].channels;
      let guildchannels = message.guild.channels.map(c => {return [c.id, c.name] });

      if (args.slice(1).length > 0) {
        let cname = args.slice(1).join(" ");
        let c = guildchannels.find(_c => {return _c[1] == cname})

        if (!c) {
          message.reply(`I cannot find channel ${cname} in this server :slight_frown:`);
        } else if (!channels.includes(c[0])) {
          message.reply(`Okay, I have added ${cname} to the list of allowed channels.`);
          channels.push(c[0]);
        } else {
          message.reply(`Okay, I have removed ${cname} from the list of allowed channels.`)
          channels.splice(channels.indexOf(c[0]), 1);
        }
      } else if (message.guild.ownerID == message.author.id) {
        message.reply("Repeat this command with a channel name to add or remove it from the channels I listen to. If the channel list is empty, I will listen to all channels.")
      }

      let channel_list = guildchannels.filter(c => { return channels.includes(c[0]) }).map(c => {return "#"+c[1]});
      if (channel_list.length == 0) { channel_list.push("All channels")};

      message.reply(`In this server, I'm listening to these channels: ${channel_list.join(", ")}`);
      server_config[message.guild.id].channels = channels;
      save()
      break;


    case "prefix":
      let prefix = server_config[message.guild.id].prefix;

      if (args.slice(1).length > 0) {
        if (args[1] == "clear") {
          message.reply("Okay, prefix reset to the default.")
          prefix = global_prefix;
        }
        else {
          prefix = args[1];
          message.reply("Okay, new prefix set for this server.")
        }
      } else if (message.guild.ownerID == message.author.id) {
        message.reply('Repeat this command with a new prefix for this server, or "clear" to return to the default.')
      }

      message.reply(`My prefix for this server is "${prefix || global_prefix}"`)
      server_config[message.guild.id].prefix = prefix;
      save()
      break;
    default:
      message.reply("The possible config options are `channels`, and `prefix`")
      break;
  }

  return true;
};
