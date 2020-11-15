module.exports = {
  name: "help",
  desc: "Gives information about other commands. You should already know it, since you are asking for help on help :thinking:.",
  usage: "`help` for a list of commands, or `help <command>` for help on an specific command.",
  requires_egg: false,
  category: "general",
  act,
}

const fs = require('fs');
let commands = [];
let categories = new Set();

fs.readdir('./commands/', (err, files) => {
  files.forEach(file => {
    let {name, desc, usage, category} = require(`../commands/${file}`);

    commands.push({"name":name, "desc":desc, "usage":usage, "category":category})
    categories.add(category);
  })
})

function act(message) {

  let tokens = message.content.trim().split(" ");
  let args = tokens.slice(tokens.indexOf(`help`)+1);

  if (args.length > 0) {
    command = commands.find(x => { return x.name == args[0] });
    if (command) {
      let msg = `Help for "${args[0]}":\n`;
      msg += command["desc"]+"\n";
      msg += "*Usage:* " + command["usage"];

      message.reply(msg)
      return true;
    } else {
      message.reply(`I don't know any command called "${args[0]}"`)
      return false;
    }
  }

  let msg = "List of Commands that I know:"

  for (cat of categories) {
    if (cat != "hidden") {
      msg += `\n*${cat} commands*: `
      msg += commands.reduce((a,x) => { return a + (x["category"]==cat?", `"+x["name"]+"`":"") }, "").slice(1);
    }
  }

  msg += "\nUse `!help <command>` to learn more about a command.";

  message.reply(msg);
  return true;
}
