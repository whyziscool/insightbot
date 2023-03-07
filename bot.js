/*******************************************************

* Copyright (C) 2023-2024 notaisar <aisarwinning@courvix.com>

*

* This file is part of insight bot.

*

* insight bot can not be copied and/or distributed without the express

* permission of notaisar

*******************************************************/

const { Client, GatewayIntentBits, Partials, Collection, Events, REST, Routes } = require('discord.js');
const noblox = require('noblox.js');

const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const client = new Client({ intents: 65535, partials: [Partials.Channel, Partials.Message, Partials.GuildMember, Partials.User, Partials.Reaction, Partials.Guild] });

const gistUrl = process.env.ENV_WEB;
const accessToken = process.env.ENV_KEY;

fetch(gistUrl, {
  headers: {
    "Authorization": `token ${accessToken}`
  }
})
.then(response => response.json())
.then(data => {
  client.env = data
})
.catch(error => {
  console.error("ERROR: " + error);
});


client.commands = new Collection();

  const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  if (file === "") {
    continue
  }
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'run' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`);
	}
}

  const eventFiles = fs.readdirSync(path.join(__dirname, 'events'), { withFileTypes: true });
  for (const file of eventFiles) {
    if (!file.isFile() || !file.name.endsWith('.js')) continue;
    try {
      const event = require(path.join(__dirname, 'events', file.name));
      const eventName = event.name;
      if (event.once) {
        client.once(eventName, (...args) => event.execute(client, ...args));
      } else {
        client.on(eventName, (...args) => event.execute(client, ...args));
      }
    } catch (error) {
      console.log(error);
    }
  }


// Construct and prepare an instance of the REST module


client.login(process.env.TOKEN);
