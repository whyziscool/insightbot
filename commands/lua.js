const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')
 
// Define a function to execute Lua code in a secure sandbox
const { VM, VMScript } = require('lua.vm.js');


// Define a function to execute Lua code in a secure sandbox
function executeLua(code) {
  const vm = new VM({
    sandbox: {
      print: console.log, // Allow printing to console
      _G: {}, // Prevent access to the global environment
      math: Math, // Allow access to the Math object
      string: String, // Allow access to the String object
      table: Array, // Allow access to the Array object (as Lua tables)
    }
  });
  const script = new VMScript(code);
  return vm.run(script);
}
module.exports = {
  name: "lua",
  aliases: ["luaeval"],
  async run(client, message, command, args) {  
   if (!args[0]) return message.reply("provide something like edit or create or something")

   const code = args.join(" ")
    try {
      const result = executeLua(code);
var embed = new EmbedBuilder()
      embed.setTitle("pure lua environment - sandbox")
      embed.setDescription("```" + result + "```")
      embed.setColor("#e3e3e3")

      message.reply({embeds: [embed]}, true);
    } catch (e) {
      message.channel.send('Error: ' + e.toString());
    }
  } 
}