module.exports = {
  name: "feed",
  desc: "Gives food to your egg. If the egg is asleep, or not hungry, puts the food on the cupboard for it to eat later. Each egg has different likes and dislikes, so make sure to experiment!",
  usage: "`feed <name of food>`",
  requires_egg: true,
  category: "tamagochi",
  act,
}


function act(message, egg) {

  let tokens = message.content.trim().split(" ");
  let args = tokens.slice(tokens.indexOf(`feed`)+1);
  args = args.join(" ");
  if (args.length == 0) { args = "pet food" };

  let reply = egg.feed(args);
  message.reply(reply);

  return true;
};
