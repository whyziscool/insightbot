const { Events } = require('discord.js');
const noblox = require("noblox.js")
const moment = require("moment-timezone")
const { joinVoiceChannel, generateDependencyReport, createAudioPlayer, createAudioResource } = require("@discordjs/voice")
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('connected to the database');
  
  // Create the pastebins table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS scripts (
    id TEXT PRIMARY KEY,
    content TEXT,
    owner_id TEXT,
    guild_id TEXT
  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {

    client.guilds.fetch()
    
    client.roblox = await noblox.setCookie(process.env.COOKIE)

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
  if (guild.memberCount > 4) {
    real++ 
  }
  
  
});

         return [String(real), client.guilds.cache.size]
    }

    client.user.setPresence({ activities: [{ name: 'currently in ' + client.getServers()[0] + ' servers (' + client.guilds.cache.size + ')'}] });

    client.storage = require("../src/storage")

    client.database = db

    console.log(`logged in as ${client.user.tag}`)
    console.log(`signed in as ${client.roblox.UserName}#${client.roblox.UserID}`)

      console.log("============")
      client.guilds.cache.forEach(guild => {
  console.log(`${guild.name} - ${guild.memberCount} members`);
});
      console.log("============")

     // run every 10 seconds
 // Check every 30 seconds

  }
};