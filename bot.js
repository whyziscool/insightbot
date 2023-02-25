/*******************************************************

* Copyright (C) 2023-2024 notaisar <aisarwinning@courvix.com>

*

* This file is part of insight bot.

*

* insight bot can not be copied and/or distributed without the express

* permission of notaisar

*******************************************************/

const { Client, GatewayIntentBits, Partials, Collection, Events } = require('discord.js');
const noblox = require('noblox.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: 65535, partials: [Partials.Channel, Partials.Message, Partials.GuildMember, Partials.User, Partials.Reaction] });

client.commands = new Collection();

function unpack() {
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'), { withFileTypes: true });
  for (const file of commandFiles) {
    if (!file.isFile() || !file.name.endsWith('.js')) continue;
    const fileName = file.name.slice(0, -3);
    const fileContents = require(path.join(__dirname, 'commands', file.name));
    client.commands.set(fileName, fileContents);
    for (const alias of fileContents.aliases) {
      client.commands.set(alias, fileContents);
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
      console.error(error);
    }
  }
}

unpack();

client.login(process.env.TOKEN);