/*
This event is launched when the bot logs in to Discord. Setting up the
online presence of the bot should be here.
 */

// Event when the bot initializes

module.exports = (client) => {

  console.log(`Tamabot has logged in as ${client.user.tag}!`)
  client.user.setActivity("who !ask for eggs", { type: "WATCHING" });

  // TODO: list guilds I'm present in, and make a list of channels I'm allowed to post to.

  var _homeGuild = client.guilds.find(_ => _.name === "caranha-bot-workshop")
  var _homeChannel = _homeGuild.channels.find(_ => _.name === "general")
  _homeChannel.send("TamaBot is ready!")

  return {
    debugChannel: _homeChannel
  }
}
