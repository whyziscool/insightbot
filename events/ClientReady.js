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

    client.storage = require("../src/storage")

    client.database = db

    console.log(`logged in as ${client.user.tag}`)
    console.log(`signed in as ${client.roblox.UserName}#${client.roblox.UserID}`)

    setInterval(() => {
  const currentTime = moment().tz("Asia/Kuwait");
  const currentHour = currentTime.hour();
  const currentMinute = currentTime.minute();

  // Prayer times in Kuwait
  const prayerTimes = {
    4: 'Fajr', 12: 'Dhuhr', 15: 'Asr', 18: 'Maghrib', 19: 'Isha',
  };

  if (currentMinute === 25 && currentHour in prayerTimes) {
    const prayerName = prayerTimes[currentHour];

    const channel = client.channels.cache.get("1076742729977045075");
    if (channel) {
      const lastPrayerTime = client.lastPrayerTime || "Jummah";
      
      if (lastPrayerTime === prayerName) {
        return;
      }
      client.lastPrayerTime = prayerName;

      console.log("adhaan started")
      
      channel.send("======= " + prayerName + " Prayer =======");
      channel.send("[KUWAIT TIMING] USA Prayer Time is XX + 8 hour");
      channel.send('JOIN VC FOR ADHAN')
      channel.send("Allahu Akbar Allahu Akbar.");

      client.wait(2);

      channel.send("Ašhadu al lā ilāha illā -llāhu");

      client.wait(1);

      channel.send("Ašhadu anna Muḥammada rasūlu -llāhi");

      client.wait(1);

      channel.send("Hasten to Prayer");

      client.wait(1);
      channel.send("Hasten to Salvation");

      client.wait(1);

      if (prayerName === "Fajr") {
        channel.send("Prayer is better than sleep");
      }

      client.wait(1);

      channel.send("Allahu Akbar Allahu Akbar");
      channel.send("Ašhadu al lā ilāha illā -llāhu");

      channel.send("======= " + prayerName + " Prayer =======");
    }
  }
}, 10 * 1000); // run every 10 seconds
 // Check every 30 seconds

  }
};