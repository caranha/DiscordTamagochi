module.exports = {
  name: "check",
  desc: "Get general information about your egg.",
  usage: "`check`",
  requires_egg: true,
  category: "tamagochi",
  act,
}

function act(message, egg) {

  let description = egg.describe();
  message.reply(description);
  return true;

};
