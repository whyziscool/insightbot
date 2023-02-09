const Discord = require('discord.js');

var words = ["nigger", "black ass" , "allahini", "a monkey", "molest", "i love children" , "im a pedo", "mommy", "daddy", "~", "https://media.giphy.com/media/bOg3T25AhXrZJDeMrQ/giphy.gif", "https://images-ext-1.discordapp.net/external/Hd6NjCB6Bet1W80oPaffdna2Zy__XTV15lLxOIjH5SY/%3Fcid%3D73b8f7b118687c50c1bfbbaf10ce606887c2c5d5a07007dd%26rid%3Dgiphy.mp4%26ct%3Dg/https/media3.giphy.com/media/bOg3T25AhXrZJDeMrQ/giphy.mp4", "cothussy", "suck my dick", "blackie", "niggar", "oily men" , "god im so horny", "im hard", "im bricked", "erect", "gang bang", "pornhub", "porn", "cock", "penis", "bbc", "gay sex", "thug shaker", "thug hunter", "suck my clit", "suck my pussy", "give me head", "https://media.discordapp.net/attachments/938169708270718976/1031667839247073420/image0.gif", "purr", "uwu", "ching chong", "blm"]

module.exports = {
	name: Discord.Events.MessageCreate,
	once: false,
	async execute(client, message) {

  if (message.author.bot) return;

if (Math.floor(Math.random() * 100) === 1) {
message.reply("this you " + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 150) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 180) + "?", true)
}
    
try {
  for (const word of words) {
    if (message.content === "" || message.content === " ") return;
    if (word === " " || word === "")  return;
    if ((message.content.toLowerCase()).indexOf(word) !== -1) {
      let previousMessage = client.getDB.get(message.author.id);
      var weirdamount;

      if (!previousMessage) {
        client.setDB.run({
        id: message.author.id,
        message: "",
        weirdamount: 1,
      });

        previousMessage = client.getDB.get(message.author.id)

        weirdamount = previousMessage.weirdamount
      }
      if (previousMessage) {
        weirdamount = previousMessage.weirdamount
        if (previousMessage.message === message.content && previousMessage.message !== "") {
          return;
        }
      }

      client.setDB.run({
        id: message.author.id,
        message: message.content,
        weirdamount: weirdamount + 1 || weirdamount++,
      });
                                               var weirdamount = previousMessage.weirdamount

      var embed = new Discord.EmbedBuilder()

      console.log(weirdamount, previousMessage.weirdamount)
      embed.setTitle("bro said")
      embed.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
      if (message.url) {
        embed.setThumbnail(message.url)
      }
      embed.setFooter({text: "this is the " + String(weirdamount) + "th weird shit he said"})
      embed.setDescription("**" + message.content + "**")
      var msg = await client.clownery.send({embeds: [embed]})

      if (message.author.id === "677599981405732885") {

setTimeout(function() {
    msg.delete()}, 3000);
      }

      break
    }
  }
} catch(err) {
  console.log("MESSAGE_CREATE: " + err)
}
    
 if(!message.content.startsWith("$")) return; 

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g); 
  const command = args.shift().toLowerCase() 
  var cmd = client.commands.get(command);  
  if(!cmd) return;
    
 if (cmd.permissions) {
   for (let i = 0; i < cmd.permissions.length; i++) {
    if (!message.member.permissions.has(cmd.permissions[i])) return message.reply(`you don't have the ${"`" + cmd.permissions[i] + "`"} permission`, true)
   }
 }

  if (cmd.roles) {
    for (let i = 0; i < cmd.roles.length; i++) {
    if (!message.member.roles.cache.find(role  => role.name == cmd.roles[i])) return message.lineReply(`you dont have the ${"`" + cmd.roles[i] + "`"} role`, true)
    }
  }
if (cmd.devonly) {
if (message.author.id !== "604758234057670686")
      return;
}

    if (!message.guild) {
if (!cmd.dmcmd) return message.reply("this is a guild only command", true);}
    if (message.guild) {
      if (cmd.dmcmd) return message.reply("this is a DM only command" , true);    }
try {
  cmd.run(client, message, command, args)
    
} catch(err) {
    console.log(err)
  }
	},
};