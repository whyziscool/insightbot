const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  cooldown: 120,
  cooldowns: [],
  data: new SlashCommandBuilder()
	.setName('support')
	.setDescription('support the devs')
  .addStringOption(option =>
    option.setName("type")
    .setDescription("what type of support")
    .setRequired(true)
    .addChoices(
      {name: "roblox", value: "rblx"},
      {name: "discord nitro", value: "nitro"},
      {name: "moral", value: "moral"}
))
.addStringOption(option =>
  option.setName("text")
  .setDescription("this is required for options such as nitro or support")
)
.addStringOption(option =>
    option.setName("anonymous")
    .setDescription("do you want aisar to know who you are if you used discord nitro/moral?")
    .setRequired(false)
    .addChoices(
      {name: "yes", value: "true"},
      {name: "no", value: "false"}
)),

  async run(client, interaction) { 
    //interaction.deferUpdate()
    
    var type = interaction.options.getString("type") ?? null
  var text = interaction.options.getString("text") ?? null
    var anonymous = interaction.options.getString("anonymous") ?? null

  if ((type === "moral" || type === "nitro") && text === null) return interaction.editReply("you gotta fill the text option since you chose " + type + " option")

                                             if (type === "nitro" && !text.includes("discord.")) return interaction.editReply("this isn't a gift link")

   if (type === "rblx") {
     var embed = new EmbedBuilder()
     embed.setTitle("roblox donations - insight bot")
     embed.setDescription('pick how much you want to donate\n\nany amount is appreciated')
     embed.addFields(
       {name: "10 robux", value: "[here](https://www.roblox.com/catalog/12652615632)", inline: true},
       {name: "50 robux", value: "[here](https://www.roblox.com/catalog/12653549060)", inline: true},
       {name: "100 robux", value: "[here](https://www.roblox.com/catalog/12653551829)", inline: true},
       {name: "500 robux", value: "[here](https://www.roblox.com/catalog/12653582316)", inline: true},
       {name: "1,000 robux", value: " [here](https://www.roblox.com/catalog/12653580270)", inline: true},
       {name: "5,000 robux", value: " [here](https://www.roblox.com/catalog/12653584339)", inline: true},
  {name: "10,000 robux", value: "[here](https://www.roblox.com/catalog/12653589634)", inline: true})
     embed.setColor("#e3e3e3")
     interaction.followUp({content: '', embeds: [embed], ephemeral: true})

   } else if (type === "moral" || type === "nitro") {
    if (anonymous === "true") {
client.guilds.cache.get("1077325712924618762").members.cache.get("604758234057670686").send("**================================**\n\na message has been sent by anonymous#" + interaction.user.discriminator + " [" + type + "]\n\n**" + text + "**\n\n**================================**")
    } else {
      client.guilds.cache.get("1077325712924618762").members.cache.get("604758234057670686").send("**================================**\n\na message has been sent by " + interaction.user.tag + " [" + type + "]\n\n**" + text + "**\n\n**================================**")
    }

     interaction.editReply("your message has been sent <:steamhappy:1079472241890308236>")
   }
  } 
}