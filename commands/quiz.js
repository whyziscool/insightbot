const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const noblox = require('noblox.js')

var questions = [
  {
    question: "how many shriekers are in crypt?",
    answer: ["6", "six" ]
  },
{
  question: "what build is Arch_Mage on rogue lineage",
  answer: ["dslayer seraph", "dragon slayer seraph", "seraph dslayer"]
},
  {
    question: "what is the orderly greatsword class?",
answer: ["doesn't exist", "it doesn't exist", "it's not real", "nonexistent"]
  },
  {
question: "who owns insight bot?",
answer: ["aisar"]
  },
  {
    question: "what seperates the cardinal crossing and the sea of dust?",
    answer: ["sentinel", "tower on the wall"]
  },
  {
    question: "which anime youtuber got false banned on rogue lineage?",
    answer: ["nano", "nanoprodigy", "nano prodigy"]
  },
  {
question: "which youtuber plays dragon  sage the most?",
    answer: ["big man boose", "big man boobs"]
  },
  {
question: "which dev made the races in rogue lineage?",
    answer: ["arch", "arch mage", "arch_mage"]
},
  {
    question: "which contributor made the models for the sword?",
    answer: ["nilvaat"]
  },
  {
question: "what non-dev account has the most spec?",
    answer: ["mudock biademaster"],
},
  {
question: "who is the most black rogue lineage youtuber?",
    answer: ["aga", "agamatsu"]
  },
  {
    question: "in how many locations can fallion spawn?",
    answer: ["3"]
  },
  {
    question: "who made tbd?",
    answer: ["ayz"]
  },
    {
      question: "what picosecond of the universe does the second goshoryu uppercut go off (show ur work) (answer in akkadian language)",
      answer: ["2000000000000 picoseconds", "2000000000000"]
    },
  
]

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