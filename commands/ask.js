module.exports = {
  name: "ask",
  desc: "This command creates a new egg for you, if you do not have one yet. Take good care of it!",
  usage: "Just `!ask`",
  requires_egg: false,
  act,
}

let nest = require("../tamagochi/nest.js")

let success_message = "Ok, I created an new egg for you. You should `!check` it!"
let fail_message = "Looks like you already have an egg!"

function act(message) {
  //let e = nest.get(message.author.id)

  if (typeof e == 'undefined') {
    nest.create(message.author);
    message.reply(success_message);
  } else {
    message.reply(fail_message);
  }

  return true;
};
