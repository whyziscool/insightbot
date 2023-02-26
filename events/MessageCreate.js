const Discord = require('discord.js');

// Create a Map to store the last time the command was used for each user
const cooldowns = new Map();

module.exports = {
  name: Discord.Events.MessageCreate,
  once: false,
  async execute(client, message) {
    if (message.author.bot) return;

    if (!message.content.startsWith("$")) return;

    const [command, ...args] = message.content.slice(1).trim().split(/ +/g).map(arg => arg.toLowerCase());
    const cmd = client.commands.get(command);
    if (!cmd) return;

    // Check if the command has a cooldown
    if (cmd.cooldown) {
      const userId = message.author.id;
      const now = Date.now();
      const cooldownAmount = cmd.cooldown * 1000;

      if (cooldowns.has(userId)) {
        const lastUsed = cooldowns.get(userId);
        const timeLeft = (lastUsed + cooldownAmount) - now;

        if (timeLeft > 0) {
          return message.reply(`please wait ${timeLeft / 1000} seconds before using the \`${command}\` command again.`, true);
        }
      }

      cooldowns.set(userId, now);
      setTimeout(() => {
        cooldowns.delete(userId);
      }, cooldownAmount);
    }

    if (cmd.permissions?.forEach(permission => {
      if (!message.member.permissions.has(permission)) {
        message.reply(`you don't have the \`${permission}\` permission`, true);
        return true;
      }
    })) return;

    if (cmd.roles?.forEach(role => {
      if (!message.member.roles.cache.find(r => r.name === role)) {
        message.reply(`you don't have the \`${role}\` role`, true);
        return true;
      }
    })) return;

    if (cmd.whitelist && message.author.id !== "604758234057670686") return;

    if (message.channel.id === "1078949420353204275") return message.reply("un-able to use command in general", true)

    try {
      cmd.run(client, message, command, args);
    } catch (err) {
      console.log(err);
    }
  },
};
