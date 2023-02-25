const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  name: "createscript",
  description: "basically pastebin",
  aliases: ["editscript", "deletescript", "makescript", "viewscript", "scriptlist", "showscripts", "scripts", "viewscripts" , "showscript", "script"],
  async run(client, message, command, args) {
    var db = client.database
    const guildId = message.guild.id;
    if (command === "createscript" || command === "makescript") {
      if (!args[1]) {
        return message.reply('provide <name> <script>', true);
      }
      var id = args[0].substring(0, 30);

      id = id.replaceAll("\n", "")
      id = id.replaceAll(`
`, "")
      id = id.replaceAll("`", "")
      id = id.replaceAll("```lua", "")
                         
      
      const content = args.slice(1).join(" ");
      db.run('INSERT INTO scripts (id, content, owner_id, guild_id) VALUES (?, ?, ?, ?)', [id, content, message.author.id, guildId], function(err) {
        if (err) {
          return console.error(err.message);
        }
        message.reply(`script created with the name of ${id}`, true);
      })
    } else if (command === "editscript") {
      if (!args[1]) {
        return message.reply('provide <name> <content>', true);
      }
      const id = args[0].substring(0, 30);
      const newContent = args.slice(1).join(" ");
      db.get('SELECT owner_id FROM scripts WHERE id = ? AND guild_id = ?', id, guildId, function(err, row) {
        if (err) {
          return console.error(err.message);
        }
        if (!row || row.owner_id !== message.author.id) {
          return message.reply("you don't own this script");
        }
        db.run('UPDATE scripts SET content = ? WHERE id = ? AND guild_id = ?', [newContent, id, guildId], function(err) {
          if (err) {
            return console.error(err.message);
          }
          message.reply(`script with the name ${id} has been updated`, true);
        });
      });
    } else if (command === "deletescript") {
      if (!args[0]) {
        return message.reply('provide <name>', true);
      }
      const id = args[0].substring(0, 30);
      db.get('SELECT owner_id FROM scripts WHERE id = ? AND guild_id = ?', id, guildId, function(err, row) {
        if (err) {
          return console.error(err.message);
        }
        if (!row || row.owner_id !== message.author.id) {
          return message.reply("you don't own this script", true);
        }
        db.run('DELETE FROM scripts WHERE id = ? AND guild_id = ?', [id, guildId], function(err) {
          if (err) {
            return console.error(err.message);
          }
          message.reply(`script with the name ${id} has been deleted.`, true);
        });
      })


    } else if (command === "script" || command === "viewscript" || command === "showscript") {
      if (!args[0]) {
        return message.reply('provide <name>');
      }
      const id = args[0].substring(0, 30);
      db.get('SELECT content, owner_id FROM scripts WHERE id = ? AND guild_id = ?', [id, guildId], function(err, row) {
        if (err) {
          return console.error(err.message)
          }
        if (!row) {
        return message.reply(`no script found with name ${id}`);
      }
      var embed = new EmbedBuilder()
      embed.setTitle("<@" + row.owner_id + "> - " + id)
      embed.setDescription("```lua\n" + row.content + "```")
      embed.setColor("#e3e3e3")
      
      message.channel.send({embeds: [embed]})
    });
             } else if (command === "scriptlist" || command === "showscripts" || command === "viewscripts" || command === "scripts") {
  db.all('SELECT id, owner_id FROM scripts WHERE guild_id = ?', [message.guild.id], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    if (rows.length === 0) {
      return message.reply('there are no scripts', true);
    }
    
    var list 

    function convert(row) {
      var usser = message.guild.members.cache.get(row.owner_id)

    if (usser) {
      usser = usser.user.username
    } else {
      usser = row.owner_id || "undefined"
    }

    return usser
  }
    
    message.guild.members.fetch()
    
 list = rows.map(row => 
`- ${String(row.id).substring(0, 30)} (author: ${String(convert(row))})`).join('\n');
        
    var embed = new EmbedBuilder()
    embed.setTitle("script list")
    embed.setDescription("```" + list + "```")
    embed.setColor("#e3e3e3")

    message.reply({embeds: [embed]}, true)
  })
  }}
}
            