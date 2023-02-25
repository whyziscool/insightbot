const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  name: "addfriend",
  description: "sends a friend request from the bot's account on roblox",
  aliases: ["friend"],
  cooldown: 15,
  cooldowns: [],
  async run(client, message, command, args) {
    if (!args[0]) return message.reply("provide something like ragoozer or ur user or something")

    var userid
    var actualArg = String(args.join(" ")).substring(0, 20)

    try {
      userid = await noblox.getIdFromUsername(actualArg) || false;
    } catch (err) {
      userid = false
    }

    if (!userid) return message.reply("either this bro a random or he doesn't exist", true)

    if (userid) {
    try {
      noblox.sendFriendRequest(userid).catch((error) => {
        console.log(error)
    })} catch (err) {
      message.reply("rate limit, wait a second", true)
 

      return
    } finally {
      console.log("prevented error")
    }

    message.reply(`sent a friend request to **${actualArg}**`, true)
   }
  }
}