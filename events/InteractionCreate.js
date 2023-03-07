const Discord = require('discord.js');

// Create a Map to store the last time the command was used for each user
const cooldowns = new Map();
var { clientId } = require("../config.json")
module.exports = {
  name: Discord.Events.InteractionCreate,
  once: false,
  async execute(client, interaction) {
    if (interaction.member.bot) return;
    	if (!interaction.isChatInputCommand()) return;
if (!interaction) return;
    
   await interaction.deferReply()

    const cmd = client.commands.get(interaction.commandName);
var notAllowed = false

    if (!cmd) { interaction.editReply({content: "could not find command file", ephemeral:true});
           console.log(interaction)    
notAllowed = true
               return
              }

    // Check if the command has a cooldown
    if (cmd.cooldown) {
      const userId = interaction.user.id;
      const now = Date.now();
      const cooldownAmount = cmd.cooldown * 1000;

      if (cooldowns.has(userId)) {
        const lastUsed = cooldowns.get(userId);
        const timeLeft = (lastUsed + cooldownAmount) - now;

        if (timeLeft > 0) {
          return interaction.editReply({content: `please wait ${timeLeft / 1000} seconds before using the \`${interaction.commandName}\` command again.`, ephemeral: true});
        }
      }

      cooldowns.set(userId, now);
      setTimeout(() => {
        cooldowns.delete(userId);
      }, cooldownAmount);
    }

    if (cmd.permissions?.forEach(permission => {
      if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags[permission])) {
        interaction.editReply({content: `you don't have the \`${permission}\` permission`, ephemeral: true});

        notAllowed = true

        return
      }
    }))

    if (cmd.roles?.forEach(role => {
      if (!interaction.member.roles.cache.find(r => r.name === role)) {
        notAllowed = true
        return interaction.editReply({content: `you don't have the \`${role}\` role`, ephemeral: true});
      }
    })) 

    if (cmd.whitelist && message.author.id !== "604758234057670686") return interaction.editReply({content: "this is a private command", ephemeral: true});

    try {
      if (notAllowed === true) return;
      cmd.run(client, interaction);
    } catch (err) {
      console.log(err);
    }
  },
};
