module.exports = {
  name: "feed",
  desc: "Gives some food to your egg. Each egg has different likes and dislikes, so make sure to experiment!",
  usage: "`!feed <type of food>`",
  requires_egg: true,
  act,
}


function act(message, egg) {

  let tokens = message.content.trim().split(" ");
  let args = tokens.slice(tokens.indexOf(`!feed`)+1);
  args = args.join(" ");
  if (args.length == 0) { args = "pet food" };

  let reply = egg.feed(args);
  message.reply(reply);

  return true;
};
