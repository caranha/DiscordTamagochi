module.exports = {
  name: "name",
  desc: "Gives your egg a new name.",
  usage: "`name <new name>`",
  requires_egg: true,
  act,
}

const nest = require("../tamagochi/nest.js")

function act(message, egg) {
  let tokens = message.content.trim().split(" ");
  let args = tokens.slice(tokens.indexOf(`name`)+1);

  if (args.length == 0) {
    message.reply("What name would you like to give to your egg?");
    return false;
  }

  egg._name = args.join(" ");
  nest.update(message.author.id, egg);
  message.reply('Okay, the new name of your egg is "' + egg._name + '". I think they like it!');
  return true;
};
