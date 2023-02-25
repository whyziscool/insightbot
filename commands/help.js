const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')

var fs = require("fs");

module.exports = {
  name: "help",
  aliases: ["commands"],
  async run(client, message, command, args) { 
    var description = ""
    
   for (const file of fs.readdirSync('./commands/')) {
    if (!file.endsWith(".js")) continue;

    if (file === "help.js" || file === "template.js") {
      continue;
    }

    var fileContents = require(`./${String(file).substring(0, file.length - 3)}`); 

     description = description + "**#** `" + fileContents.name + "`\ndescription: " + fileContents.description + "\naliases: `" + fileContents.aliases.join(" | ") + "` \n\n"
   }

    description = description + "\n\nhttps://discord.com/api/oauth2/authorize?client_id=1076862278839848982&permissions=8&scope=bot"

   var helpEmbed = new EmbedBuilder()
   helpEmbed.setTitle("bot commands")
   helpEmbed.setDescription(description)
   helpEmbed.setColor("#e3e3e3")
   helpEmbed.setTimestamp()

   message.reply({embeds: [helpEmbed]}, true)
  } 
}