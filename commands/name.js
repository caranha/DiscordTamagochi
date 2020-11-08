module.exports = {
  name: "name",
  desc: "Gives your egg a new name.",
  usage: "`!name <new name>`",
  requires_egg: true,
  act,
}

const nest = require("../tamagochi/nest.js")

function act(message) {
  let e = nest.get(message.author.id);

  if (typeof e == 'undefined') {

    message.reply("You don't have an egg! Create one first with `!ask`.");
    return false;

  } else {

    let tokens = message.content.trim().split(" ");
    let args = tokens.slice(tokens.indexOf(`!name`)+1);

    if (args.length == 0) {
      message.reply("What name would you like to give to your egg?");
      return false;
    }

    e.name = args.join(" ");
    nest.update(message.author.id, e);
    message.reply('Okay, the new name of your egg is "' + e.name + '". I think they like it!');
    return true;
  }
};
