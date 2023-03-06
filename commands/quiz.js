const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const noblox = require('noblox.js')

const dev_key = process.env.dev_key";
const login_url = "https://pastebin.com/api/api_login.php";
const paste_url = "https://pastebin.com/api/api_post.php";

const username = process.env.username; // replace with your Pastebin account username
const password = process.env.password; // replace with your Pastebin account password

var questions

// log in to Pastebin and generate user API key
fetch(login_url, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: `api_dev_key=${dev_key}&api_user_name=${username}&api_user_password=${password}`,
})
  .then((response) => response.text())
  .then((data) => {
    const user_key = data; // store the user API key in a variable

    // retrieve the private paste
    const paste_key = "NaRuZU5i"; // replace with the key of the paste you want to retrieve
    const option = "show_paste";
    const body = `api_dev_key=${dev_key}&api_user_key=${user_key}&api_option=${option}&api_paste_key=${paste_key}&api_password=${process.env.paste_pass}`;

    fetch(paste_url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body,
    })
      .then((response) => response.text())
      .then((data) => {
        questions = data // print the content of the paste
      })
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));


questions = JSON.parse(questions)

module.exports = {
  cooldown: 10,
  cooldowns: [],
  data: new SlashCommandBuilder()
	.setName('quiz')
	.setDescription('just puts a quiz'),
  async run(client, interaction) { 
    //interaction.deferUpdate()

        const q = questions[Math.floor(Math.random() * questions.length)];
    
    var message = await interaction.editReply({content: q.question, fetchReply: true, ephemeral: false}).then(() => {
      const filter = response => {
	return q.answer.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
		interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] })
			.then(collected => {
				interaction.followUp(`${collected.first().author} got the correct answer it was **${collected.first().content}**`);
			})
			.catch(collected => {
				interaction.followUp('no one got the answer');
			});
	});
  } 
}
