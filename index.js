const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('server started')
});

app.listen(3000, () => {
   console.log('server started');
});

const { Client, GatewayIntentBits, Partials, Collection, Events } = require('discord.js')
const noblox = require('noblox.js')

const client = new Client({ intents: 65327, partials: [Partials.Channel, Partials.Message, Partials.GuildMember, Partials.User] })

var fs = require("fs");

client.commands = new Collection();

function unpack() {
  for (const file of fs.readdirSync('./commands/')) {
    if (!file.endsWith(".js")) return;
    var fileName = file.substring(0, file.length - 3);
    var fileContents = require(`./commands/${file}`); // Defines fileContents of the export of the command in question.

    client.commands.set(fileName, fileContents);

    for (let i = 0; i < fileContents.aliases.length; i++) {
      client.commands.set(fileContents.aliases[i], fileContents);
    }

  }

  const event_files = fs.readdirSync(`./events/`).filter((file) => file.endsWith(".js"));
  for (const file of event_files) {
    try {
      const event = require(`./events/${file.replace(".js", "")}`)
      let eventName = event.name;

      if (!event.once) {
        client.on(eventName, (...args) => event.execute(client, ...args));
      }

      if (event.once) {
        client.once(eventName, (...args) => event.execute(client, ...args));
      }


    } catch (err) {
      console.log(err)
    }
  }

  

}

unpack()

client.login(process.env.TOKEN)