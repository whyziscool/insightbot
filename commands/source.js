const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')

var fs = require("fs");

module.exports = {
  name: "source",
  aliases: ["sources", "library"],
cooldown: 10,
  cooldowns: [],

  async run(client, message, command, args) { 

    var source = require('../src/storage.js')
if (!args[0]) {

    var description = "*IF YOU SEE A **?** INSTEAD OF A **#** THEN IT'S SIGNIFYING THERE MIGHT BE BACKDOORS LEFT BY THE ORIGINAL OWNERS/PUBLISHERS*\n\n\n"
    
   for (var array of source.sources) {

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

   message.reply({embeds: [helpEmbed]}, true)
} else {
  for (var array of source.sources) {

    if (array.name.toLowerCase() === args.join(" ")) {
    
    if (client.guilds.cache.size < array.requirement && message.author.id !== "604758234057670686") {
      message.reply("unfortunately, this file is locked until " + array.requirement + " servers (true server count: " + client.getServers()[0] + ")", true)
        
      return
    }

    message.reply("you have been sent the file with a key in your dms", true)

    message.author.send({embeds: [new EmbedBuilder() .setTitle("insight bot - file library") .setDescription("do not share the key or the link with anyone else\n\n||`" + array.source + "`||\n\n||" + array.key + "||")]}, true)

  break;
  } }
}
  } 
}