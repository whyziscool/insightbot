const Discord = require('discord.js');

module.exports = {
	name: Discord.Events.MessageCreate,
	once: false,
	async execute(client, message) {

  if (message.author.bot) return;
        
 if(!message.content.startsWith("$")) return; 

  const args = message.content.slice(1).trim().split(/ +/g); 
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
if (cmd.whitelist) {
if (message.author.id !== "604758234057670686")
      return;
}

try {
  cmd.run(client, message, command, args)
    
} catch(err) {
    console.log(err)
  }
	},
};