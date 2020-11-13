module.exports = {
  name: "log",
  desc: "Check what your egg has been up to recently. List the number of messages that you want to read (default 5).",
  usage: "`log` or `log <number>`.",
  requires_egg: true,
  act,
}

const nest = require("../tamagochi/nest.js")

function act(message, egg) {

  let tokens = message.content.trim().split(" ");
  let args = tokens.slice(tokens.indexOf(`log`)+1);

  number = (args.length > 0 && !isNaN(Number(args[0])) ? Number(args[0]) : 5)

  let description = egg._get_history_string(number);

  if (description != "") { message.reply(description) }
  else { message.reply("No logged messages yet.")}
  return true;

};
