const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const noblox = require('noblox.js')
var fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
	.setName('help')
	.setDescription('shows a list of commands'),
  async run (client, interaction) {
    var description = ""
    
   for (const file of fs.readdirSync('./commands/')) {
    if (!file.endsWith(".js")) continue;

    if (file === "help.js" || file === "template.js") {
      continue;
    }

    var fileContents = require(`./${String(file).substring(0, file.length - 3)}`); 

     description = description + "**/** `" + fileContents.data.name + "`\ndescription: " + fileContents.data.description + "\n\n"
   }

    description = description + "\n*Servers*: " + client.guilds.cache.size + " (true server count: " + client.getServers()[0] + ")" + "\n*Support:* https://discord.gg/bytBBAz5rx\n*Invite:* https://discord.com/api/oauth2/authorize?client_id=1076862278839848982&permissions=8&scope=bot"

   var helpEmbed = new EmbedBuilder()
   helpEmbed.setTitle("bot commands")
   helpEmbed.setDescription(description)
   helpEmbed.setColor("#e3e3e3")
   helpEmbed.setTimestamp()

   // interaction.deferUpdate()

   interaction.editReply({embeds: [helpEmbed], ephemeral: true})
  } 
}