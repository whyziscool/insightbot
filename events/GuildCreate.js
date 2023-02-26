const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildCreate,
  once: false,
  async execute(client, guild) {
    client.user.setPresence({ activities: [{ name: 'currently in ' + (client.getServers()[0]) + ' servers'}] });
    var channel = client.channels.cache.get("1079007386284609627")

    if (channel) {
message.channel.send("- the bot got invited to a new server :tada:")
    } else {
      console.log("- couldn't find a channel")
    }

  }
};