const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  permissions: ["KickMembers"],
  data: new SlashCommandBuilder()
	.setName('kick')
	.setDescription('kicks a user from the server')
	.addUserOption(option =>
		option.setName('user')
			.setDescription('the user you want to kick')
                .setRequired(true))
  .addStringOption(option =>
		option.setName('reason')
			.setDescription('why do you want to kick them')
      .setRequired(false)),
  async run(client, interaction) {  
   const member = interaction.guild.members.cache.get(interaction.options.getUser("user").id) ?? null

  if (!member) return interaction.editReply({content: "could not find a valid guild member", ephemeral: true})

    if (!member.kickable) {
      return interaction.editReply({content: 'this member is higher than me in the role hierachy', ephemeral: true})
    }

    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      member.send(interaction.user.tag + " just tried to kick you")

      interaction.editReply({content: "you can't kick a member that has an equal or higher role than you", ephemeral: true});

      return
    }

    var reason = interaction.options.getString("reason") + " - by " + interaction.user.tag ?? "no reason specified - by " + interaction.user.tag
try {
  member.kick(reason)

  interaction.editReply(`<@${member.user.id}> has been kicked from the server`)

  try {
    member.send("you have been kicked from " + interaction.guild.name + " for:" + reason)
  } catch (err) {
   interaction.followUp("could not dm the user, but the kick went through")
  }
} catch (error) {
  console.log(error);
  
  interaction.editReply({content: 'caught an error while kicking the member', ephemeral: true});
}
  } 
}