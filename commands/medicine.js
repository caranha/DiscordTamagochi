module.exports = {
  name: "medicine",
  desc: "Gives some medicine to your egg. They hate the taste, but it can cure sickness.",
  usage: "`medicine`",
  requires_egg: true,
  act,
}

function act(message, egg) {

    message.reply(egg.give_medicine());
    return true;

};
