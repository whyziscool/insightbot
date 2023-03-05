const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const noblox = require('noblox.js')


  var source = []

  for (const x of Array(8).keys()) {
  if (x === 0) continue;


                                                if (process.env["SOURCE_" + x + "_NAME"]) {
var newSource = {
  name: process.env["SOURCE_" + x + "_NAME"],
  description: process.env["SOURCE_" + x + "_DESCRIPTION"],
  state: process.env["SOURCE_" + x + "_STATE"],
  statescript: process.env["SOURCE_" + x + "_STATESCRIPT"],
  requirement: process.env["SOURCE_" + x + "_REQUIREMENT"],
  source: process.env["SOURCE_" + x + "_SOURCE"],
  key: process.env["SOURCE_" + x + "_KEY"],
    
}
                                                  source.push(newSource)
}}



function transformSources(sources) {
  sources.sort((a, b) => a.name.localeCompare(b.name));

  // Map each source object to a new object with 'name' and 'value' properties
  const transformed = sources.map(source => ({ name: source.name, value: source.name }));

  // Map each transformed object to a new object with 'name' and 'value' properties in the correct format for addFields
  const fields = transformed.map(object => ({ name: object.name, value: object.value }));

  return fields;
}

module.exports = {
  data: new SlashCommandBuilder()
	.setName('library')
	.setDescription('if left the source option empty it will display all files')
	.addStringOption(option =>
		option.setName('source')
			.setDescription('the file to send the source of (ex. rogue lineage obby)')
    .addChoices(...transformSources(source))
.setRequired(false))
  .setDMPermission(false),
  async run(client, interaction) {
  var arg = interaction.options.getString("source") ?? null

if (!arg) {

    var description = "*IF YOU SEE A **?** INSTEAD OF A **#** THEN IT'S SIGNIFYING THERE MIGHT BE BACKDOORS LEFT BY THE ORIGINAL OWNERS/PUBLISHERS*\n\n\n"
  
   for (var array of source) {

     if (client.getServers()[0] < array.requirement) {
description = description + "**" + array.state + "**  `" + array.name + "`\n~~description: " + array.description + "\nlocked: " + array.requirement + " servers~~\n\n"
} else {
  description = description + "**" + array.state + "**  `" + array.name + "`\ndescription: " + array.description + "\n\n"}   
   }

    description = description + "\n- if you do get a key instead of sharing it share this server and this bot thx."

   var helpEmbed = new EmbedBuilder()
   helpEmbed.setTitle("library of files")
   helpEmbed.setDescription(description)
   helpEmbed.setColor("#e3e3e3")
   helpEmbed.setTimestamp()

   interaction.editReply({embeds: [helpEmbed]})
} else {
  for (var array of source) {
    if (array.name.toLowerCase() === arg.toLowerCase()) {
    
    if (client.getServers()[0] < array.requirement) {  
     // interaction.deferUpdate()
      return interaction.editReply({content: "unfortunately, this file is locked until " + array.requirement + " servers (true server count: " + client.getServers()[0] + ")", ephemeral: true})
    } else {

     // interaction.deferUpdate()
    interaction.editReply({content: "you have been sent the file with a key in your dms", ephemeral: true})

      if (array.state === "#") {
    interaction.user.send({content: `||${array.key}||`, embeds: [new EmbedBuilder() .setTitle("insight bot - file library") .setColor("#e3e3e3") .setDescription("do not share the key or the link with anyone else\n\n||`" + array.source + "`||\n\n||" + array.key + "||")]})
  } else {
      interaction.user.send({content: `||${array.key}||`, embeds: [new EmbedBuilder() .setTitle("insight bot - file library") .setColor("#e3e3e3") .setDescription("do not share the key or the link with anyone else\n\n||`" + array.source + "`||\n\n||" + array.key + "||\n\n" + array.statescript)]})  
  }

  break;
    }
  } }
}
  } 
}