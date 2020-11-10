/*
This event is launched when the bot logs in to Discord. Setting up the
online presence of the bot should be here.
 */

// Event when the bot initializes

module.exports = (client) => {

  console.log(`Tamabot has logged in as ${client.user.tag}!`)
  client.user.setActivity("@mention help", { type: "LISTENING" });

  // Read guilds I'm connected to, maybe send a greeting if appropriate.

  // var _homeGuild = client.guilds.find(_ => _.name === "caranha-bot-workshop")
  // var _homeChannel = _homeGuild.channels.find(_ => _.name === "general")
  //
  // return {
  //   debugChannel: _homeChannel
  // }
}
