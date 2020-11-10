module.exports = {
  name: "pet",
  desc: "Pets your egg. This will make them happy!",
  usage: "`pet`",
  requires_egg: true,
  act,
}

function act(message, egg) {

    message.reply(egg.pet());
    return true;

};
