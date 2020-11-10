module.exports = {
  name: "help",
  desc: "Gives information about other commands. You should already know it, since you are asking for help on help :think:.",
  usage: "`help` for a list of commands, or `help <command>` for help on an specific command.",
  requires_egg: false,
  act,
}

const fs = require('fs');
let command_help = {};
let command_list = [];
let commands;

fs.readdir('./commands/', (err, files) => {
  files.forEach(file => {
    let {name, desc, usage} = require(`../commands/${file}`);
    command_help[name] = desc + "\n*Usage*:" + usage;
    command_list.push("`"+name+"`");
  })
  commands = command_list.join(", ");
})

function act(message) {

  let tokens = message.content.trim().split(" ");
  let args = tokens.slice(tokens.indexOf(`help`)+1);

  for (_arg of args) {
    if (_arg in command_help) {
      message.reply(command_help[_arg]);
      return true;
    }
  }

  message.reply("List of commands that I understand: "+commands+"\n\nI understand the prefix `!`, mentions and DMs.")
    .then(() => message.reply(`Use \`!help <command>\` to learn more about a command.`));

  return true;
}
