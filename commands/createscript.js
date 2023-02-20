const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  name: "createscript",
  aliases: ["editscript", "deletescript", "makescript", "viewscript", "scriptlist", "showscripts", "scripts", "viewscripts" , "showscript", "script"],
  async run(client, message, command, args) {
    var db = client.database
    if (command === "createscript" || command === "makescript") {
      if (!args[1]) {
        return message.reply('provide <name> <script>', true);
      }
      const id = args[0];
      const content = args.slice(1).join(" ");
      db.run('INSERT INTO scripts (id, content, owner_id) VALUES (?, ?, ?)', [id, content, message.author.id], function(err) {
        if (err) {
          return console.error(err.message);
        }
        message.reply(`script created with the name of ${id}.`, true);
      })
    } else if (command === "editscript") {
      if (!args[1]) {
        return message.reply('provide <name> <content>', true);
      }
      const id = args[0];
      const newContent = args.slice(1).join(" ");
      db.get('SELECT owner_id FROM scripts WHERE id = ?', id, function(err, row) {
        if (err) {
          return console.error(err.message);
        }
        if (!row || row.owner_id !== message.author.id) {
          return message.reply("you don't own this script");
        }
        db.run('UPDATE scripts SET content = ? WHERE id = ?', [newContent, id], function(err) {
          if (err) {
            return console.error(err.message);
          }
          message.reply(`script with the name ${id} has been updated.`, true);
        });
      });
    } else if (command === "deletescript") {
      if (!args[0]) {
        return message.reply('provide <name>', true);
      }
      const id = args[0];
      db.get('SELECT owner_id FROM scripts WHERE id = ?', id, function(err, row) {
        if (err) {
          return console.error(err.message);
        }
        if (!row || row.owner_id !== message.author.id) {
          return message.reply("you don't own this script", true);
        }
        db.run('DELETE FROM scripts WHERE id = ?', id, function(err) {
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
    const id = args[0];
    db.get('SELECT content, owner_id FROM scripts WHERE id = ?', id, function(err, row) {
      if (err) {
        return console.error(err.message);
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
      db.all('SELECT id, owner_id FROM scripts', (err, rows) => {
if (err) {
return console.error(err.message);
}
if (rows.length === 0) {
return message.reply('there are no scripts', true);
}
const list = rows.map(row => `- ${row.id} (author: ${row.owner_id})`).join('\n');

var embed = new EmbedBuilder()
      embed.setTitle("script list")
      embed.setDescription("```" + list + "```")
        embed.setColor("#e3e3e3")

      message.reply({embeds: [embed]}, true)
    })}
  }
}