const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  name: "template",
  aliases: ["temp"],
  async run(client, message, command, args) {  
   if (!args[0]) return message.reply("provide something like edit or create or something")

   message.reply("template", true)
  } 
}