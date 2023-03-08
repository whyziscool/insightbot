const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  cooldown: 2,
  cooldowns: [],
  data: new SlashCommandBuilder()
	.setName('quiz')
	.setDescription('just puts a quiz'),
  async run(client, interaction) { 
    //interaction.deferUpdate()
if (!client.env) return interaction.editReply("got an error");
var questions = JSON.parse(client.env.questions)
        const q = questions[Math.floor(Math.random() * questions.length)];
    
    var message = await interaction.editReply({content: q.question.toLowerCase(), fetchReply: true, ephemeral: false}).then(() => {
      const filter = response => {
	return q.answer.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
		interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] })
			.then(collected => {
				interaction.followUp(`${collected.first().author} got the correct answer it was **${collected.first().content}**`);
			})
			.catch(collected => {
				interaction.followUp('no one got the answer it was **' + q.answer[0] + '**');
			});
	});
  } 
}
