const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  permissions: ["TimeoutMembers"],
  data: new SlashCommandBuilder()
	.setName('timeout')
	.setDescription('times out a member')
	.addUserOption(option =>
		option.setName('user')
			.setDescription('the user you want to ban')
                .setRequired(true))
.addStringOption(option =>
		option.setName('duration')
			.setDescription('how long you want them timed out for')
      .setRequired(true)
   .addChoices(
    {name: "30 seconds", value: "30000"},
     {name: "60 seconds", value: "60000"},
     {name: "5 minutes", value: "300000"},
     {name: "1 hour", value: "3600000"},
     {name: "24 hours", value: "86400000"},
     {name: "1 week", value: "604800000"}
     ))
  .addStringOption(option =>
		option.setName('reason')
			.setDescription('why do you want to ban them')
      .setRequired(false)),
  
  async run(client, interaction) {  
   const member = interaction.guild.members.cache.get(interaction.options.getUser("user").id) ?? null

  if (!member) return interaction.editReply({content: "could not find a valid guild member", ephemeral: true})

    if (!member.kickable) {
      return interaction.editReply({content: 'this member is higher than me in the role hierachy', ephemeral: true})
    }

    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      member.send(interaction.user.tag + " just tried to time-out you")

      interaction.followUp({content: "you can't timeout a member that has an equal or higher role than you", ephemeral: true});

      return
    }

    var reason = interaction.options.getString("reason") + " - by " + interaction.user.tag ?? "no reason specified - by " + interaction.user.tag
try {
  member.timeout(Number(interaction.options.getString("duration")), reason)

  interaction.editReply(`<@${member.user.id}> has been timed out`)

  try {
    member.send("you have been timed out from `" + interaction.guild.name + "` for: `" + reason + "`")
  } catch (err) {
   interaction.followUp("could not dm the user, but the time-out went through")
  }
} catch (error) {
  console.log(error);
  
  interaction.editReply({content: 'caught an error while attempting to time out the member', ephemeral: true});
}
  } 
}