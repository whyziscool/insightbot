const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const noblox = require('noblox.js')

const getUserTrait = (username) => {
  switch (username) {
    case "Skidnik":
      return "pedophile";
    case "HateBored":
      return "rogue lineage entrepreneur";
    case "Arch_Mage":
      return "he says he chews grass";
    case "rip_indra":
      return "lost 1.2m robux";
    case "Phoeyu":
      return "a random";
    case "Melon_Sensei":
      return "i love aba";
    case "deepwoken":
      return "#1 deepwoken fan";
    case "1UpShroom":
      return "tech support scammer";
    case "huuc":
     return "plays faceless";
    case "clash_andrew":
      return '"kill all beaners" - clash_andrew 4:38:37 PM Saturday, February 25, 2023';
    case "Ragoozer":
      return "he loves permadeath";
    case "NanoProdigy":
      return "yurrr lissen man";
    case "sixdemises":
      return "built different";
    case "rngmoth":     
      return "demon of gaia, goated nigga";
    case "appledogPE":
      return "the biggest bird";
    case "b4ncck":
      return "awesome swallow reversal creator";
    case "CaptainLosticJr":
      return "uses discord.py";
    case "ExoMood":
      return "poor man got his acc termimated";
    case "Agamatsu":
      return "dragon sage main";
    case "Taahmi":
      return "hello";
    case "grim_cure":
      return "go $lookup Taahmi";
    case "PixelAissar":
      return "terrorist";
    case "BananaWaffleCake":
      return "inmoon";
    case "rogueEgirl":
      return "https://cdn.discordapp.com/attachments/1078949420353204275/1079192027322908772/v09044g40000cb6l24rc77u9a3clrplg.mp4";
    default:
      return null;
  }
};

const groupTraits = new Map([
  ["4556484", "rogue lineage dev/tester"],
  ["5212858", "deepwoken dev/tester"],
]);

const itemTraits = [
  {
    id: "2124503714",
    trait: "went to khei",
  },
  {
    id: "2124634281",
    trait: "probably some retarded uber class",
  },
  {
    id: "2124634270",
    trait: "probably an ultra class",
  },
  {
    id: "2124634287",
    trait: "unironically a rogue sweat dude got an edict",
  },
];

module.exports = {
  data: new SlashCommandBuilder()
	.setName('whois')
	.setDescription('shows the roblox profile of the user')
	.addStringOption(option =>
		option.setName('username')
			.setDescription('the user to display the profile of').setRequired(true)),
  async run(client, interaction) {  
    let userId;
  let user;
  
  let insight = [];
  
  try {
    userId = await noblox.getIdFromUsername(interaction.options.getString("username"))
    
    if (!userId) {
      interaction.editReply({content: "could not find user, if this is a valid user try later because rate limits", ephemeral: true});
      return ["error", []];
    }

    let user;
    
    try {
      user = await noblox.getPlayerInfo(userId);
    } catch (err) {
      interaction.editReply({content: "got an unexpected error", ephemeral: true});
      return;
    }

    let username = user.username;

    const userTrait = getUserTrait(username);
    if (userTrait) {
      insight.push(userTrait);
    }

    for (var group in user.Groups) {
      const trait = groupTraits.get(String(group.Id));
      if (trait) {
        insight.push(trait);
      }
    }

    for (var { id, trait } of itemTraits) {
      if (!user.isBanned && (await noblox.getOwnership(userId, id, "Badge"))) {
        insight.push(trait);
      }
    }

    var profileThumbnail = (await noblox.getPlayerThumbnail(userId, 420, "png", false, "Headshot"))[0].imageUrl || ""

      var infoEmbed = new EmbedBuilder()

      if (user.isBanned === false) {
        infoEmbed.setTitle(`${user.username} (${userId}) - profile`)
        infoEmbed.setURL("https://www.roblox.com/users/" + userId + "/profile")
      } else {
        infoEmbed.setTitle(`~~${user.username} (${userId}) - profile~~`)
      }

      infoEmbed.setDescription(user.blurb || "no description provided")
      
      infoEmbed.setThumbnail(profileThumbnail)
      infoEmbed.addFields(
        { name: 'account age', value: String(user.age), inline: true },
        { name: 'friends', value: String(user.friendCount), inline: true },
        { name: 'followers', value: String(user.followerCount), inline: true},
      )
  infoEmbed.setColor("#e3e3e3")

      if (insight && insight[0]) {
        infoEmbed.addFields(
          { name: 'insight', value: "`" + insight.join(" | ") + "`", inline: true}
        )
      }
      
      if (user.oldNames && user.oldNames[0]) {
        infoEmbed.addFields(
          { name: 'previous users', value: "`" + String((user.oldNames).join(" | ")).substring(0, 1020) + "`", inline: true}
        )
      }
      
      interaction.editReply({ embeds: [infoEmbed]})
    } catch (err) {
    if (err.message.includes("User not found")) {
      interaction.editReply({content: "thd user you provided does not exist", ephemeral: true})
    } else {
      interaction.editReply({content: "got rate limited, please wait 10 seconds", ephemeral: true})
    }

    
    console.log(err)
  }
  } 
}
