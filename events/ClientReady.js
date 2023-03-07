const { Events, REST, Routes } = require('discord.js');
const noblox = require("noblox.js")
const moment = require("moment-timezone")
const { joinVoiceChannel, generateDependencyReport, createAudioPlayer, createAudioResource } = require("@discordjs/voice")
const sqlite3 = require('sqlite3').verbose();
var fs = require("node:fs")
var path = require("node:path")

const { clientId } = require('../config.json');

const commandsPath = path.join(__dirname, "../commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

var commands = []

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.guilds.fetch()

    client.roblox = await noblox.setCookie(process.env.COOKIE)

    client.range = function(size, startAt = 1) {
    return [...Array(size).keys()].map(i => i + startAt);
}


    client.checkTable = function(array, look_for) {
      for (var value of array) {
        if (value === look_for) {
          return true
        }
      }

      return false
    }

    client.wait = function(seconds) {
      return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    client.getServers = function() {
      var real = 0

client.guilds.cache.forEach(guild => {
  guild.channels.fetch()
  
  if (guild.memberCount > 4) {
    real++ 
  }
  
  
});

         return [String(real), client.guilds.cache.size]
    }

    client.user.setPresence({ activities: [{ name: 'currently in ' + client.getServers()[0] + ' servers (' + client.guilds.cache.size + ')'}] });

    client.storage = {
      "classes": (process.env.classes).split(":"),
"races": (process.env.races).split(":"),
"artifacts": (process.env.artifacts).split(":"),
"privateservers": (process.env.privateservers).split(":")
    }

    client.database = [] // bandage

    console.log(`logged in as ${client.user.tag} with ${client.guilds.cache.size} servers`)
    console.log(`signed in as ${client.roblox.UserName}#${client.roblox.UserID}`)

      const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    
for (const file of commandFiles) {
  var filePath = path.join(commandsPath, file)
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// and deploy your commands!
(async () => {
	try {
		console.log(`started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set

    var data

    client.guilds.cache.forEach(async guild => {
  var guildId = guild.id

      try {
      
		data = await rest.put(Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
      } catch(err) {
        console.log("failed to set commands for guild")
      }
}
    )

    console.log("added application (/) commands to * guilds")

	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.log(error);
	}
})();

     setInterval(() => {
    var ch = client.channels.cache.get("1078949420353204275")
       if (ch) {
         if (Math.floor(Math.random() * 2) > 0) {
         ch.send("<@584774112120143964> <@428717845854158848> https://cdn.discordapp.com/attachments/1078949420353204275/1079192027322908772/v09044g40000cb6l24rc77u9a3clrplg.mp4")
         } else {
           ch.send("<@584774112120143964> <@428717845854158848> https://media.discordapp.net/attachments/1067670720139763845/1080700262051741826/FqJvqV1X0AEmD-I.png")
         }
       }
  }, 3 * 60 * 60 * 1000);

  }
};
