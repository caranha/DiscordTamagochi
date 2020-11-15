module.exports = {
  name: "eat",
  desc: "Eats some food. You better share some with your pet too!",
  usage: "`eat <name of food>`",
  requires_egg: true,
  category: "hidden",
  act,
}


function act(message, egg) {

  let tokens = message.content.trim().split(" ");
  let args = tokens.slice(tokens.indexOf(`eat`)+1);
  args = args.join(" ");
  if (args.length == 0) { args = "pet food" };

  reply = egg.eat(args);

  message.reply(reply);

  return true;
};
