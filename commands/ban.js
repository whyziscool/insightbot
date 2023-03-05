const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  permissions: ["BanMembers"],
  data: new SlashCommandBuilder()
	.setName('ban')
	.setDescription('bans a user from the server')
	.addUserOption(option =>
		option.setName('user')
			.setDescription('the user you want to ban')
                .setRequired(true))
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
      member.send(interaction.user.tag + " just tried to ban you")

      interaction.followUp({content: "you can't ban a member that has an equal or higher role than you", ephemeral: true});

      return
    }

    var reason = interaction.options.getString("reason") + " - by " + interaction.user.tag ?? "no reason specified - by " + interaction.user.tag
try {
  member.ban({reason: reason})

  interaction.editReply(`<@${member.user.id}> has been banned from the server`)

  try {
    member.send("you have been banned from " + interaction.guild.name + " for:" + reason)
  } catch (err) {
   interaction.followUp("could not dm the user, but the ban went through")
  }
} catch (error) {
  console.log(error);
  
  interaction.editReply({content: 'caught an error while attempting to ban the member', ephemeral: true});
}
  } 
}