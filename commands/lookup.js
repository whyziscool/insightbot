const { EmbedBuilder } = require("discord.js");
const noblox = require('noblox.js');

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
    case "huuc":
     return "plays faceless";
    case "Ragoozer":
      return "he loves permadeath";
    case "NanoProdigy":
      return "yurrr lissen man";
    case "LordSendo":
      return "pedophile and trans lover";
    case "Valeyx":
      return "sendo v2";
    case "Gopnik":
      return "pedophile";
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
    case "fuckyou":
      return "fuk";
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
  name: "lookup",
  description: "looks up a roblox profile and can provide insight",
  aliases: ["whois", "who"],
  cooldown: 4,
  cooldowns: [],
  async run (client, message, command, args) {

  let userId;
  let user;
  
  let insight = [];
  
  try {
    userId = await noblox.getIdFromUsername(args.join(" "));
  
    if (!userId) {
      message.reply("could not find user, if this is a valid user try later because rate limits", true);
      return ["error", []];
    }

    let user;
    
    try {
      user = await noblox.getPlayerInfo(userId);
    } catch (err) {
      message.reply("got an unexpected error", true);
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
      
      message.reply({ embeds: [infoEmbed]}, true)
    } catch (err) {
    console.log(err)
   }
  }
}