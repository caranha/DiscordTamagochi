module.exports = {
  name: "check",
  desc: "Get information about your egg, or someone else's egg, if you know their name.",
  usage: "`!check` or `!check <name>`.",
  requires_egg: true,
  act,
}

const nest = require("../tamagochi/nest.js")

function act(message, egg) {

  let description = egg.describe();
  message.reply(description);
  return true;

};
