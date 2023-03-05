const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('shows the web socket ping'),
  async run(client, interaction) { 
    //interaction.deferUpdate()
    
   interaction.editReply({content: "bot is running at " + client.ws.ping + "ms\n\n*keep in mind this bot doesn't have a reliable host*", ephemeral: true})
  } 
}