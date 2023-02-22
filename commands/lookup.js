const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')

module.exports = {
  name: "lookup",
  description: "shows information about a roblox user",
  aliases: ["whois"],
  async run(client, message, command, args) {
    if (!args[0]) return message.reply("provide <username>")

    var actualArg = args.join(" ")
    var userid

try {
  userid = await noblox.getIdFromUsername(actualArg);
} catch (err) {
  userid = false
}

    
  if (!userid) return message.reply("could not find user, if this is a valid user try later because rate limits");

    if (userid) {
try {
var user
      try {
      user = await noblox.getPlayerInfo(userid)
      } catch (err) {
        user = false
      }

if (!user) return message.reply("got an unexpected error", true)
      var userTraits = {
        ["Skidnik"]: "pedophile",
        ["HateBored"]: "rogue lineage entrepreneur",
        ["Arch_Mage"]: "he says he chews grass",
        ["rip_indra"]: "lost 1.2m robux",
        ["Phoeyu"]: "a random",
        ["Melon_Sensei"]: "i love aba",
        ["deepwoken"]: "#1 deepwoken fan",
        ["huuc"]: "plays faceless",
        ["Ragoozer"]: "he loves permadeath",
        ["NanoProdigy"]: "yurrr lissen man",
        ["LordSendo"]: "pedophile and trans lover",
        ["Valeyx"]: "sendo v2" ,
        ["Gopnik"]: "pedophile",
        ["b4ncck"]: "awesome swallow reversal creator",
        ["CaptainLosticJr"]: "uses discord.py",
        ["ExoMood"]: "poor man got his acc termimated",
        ["Agamatsu"]: "dragon sage main",
        ["Taahmi"]: "hello",
        ["grim_cure"]: "go $lookup Taahmi",
        ["PixelAissar"]: "terrorist",
        ["BananaWaffleCake"]: "inmoon" ,
        ["fuckyou"]: "fuk",
        
        ["diavzo"]: Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255),
        
      }

      var matchTraits = {
        ["rip_"]: "bloxfruits fan",
        ["hate"]: "one of HateBored's unwilling slaves",
        ["shelove"]: "shedoesntlove"
}

      var groupTraits = {
        ["4556484"]: "rogue lineage dev/tester",
        ["5212858"]: "deepwoken dev/tester",
      }

  var itemTraits = {
    ["2124503714"]: "went to khei" ,
    ["2124634281"]: "probably some retarded uber class",
    ["2124634270"]: "probably an ultra class" ,
    ["2124634287"]: "unironically a rogue sweat dude got an edict"
  }


      var insight = []
      var groups = await noblox.getGroups(userid)

      if (userTraits[user.username]) {
        insight.push(userTraits[user.username])
      }

      for (var group in groups) {
        if (groupTraits[String(group.Id)]) {
          insight.push(groupTraits[String(group.Id)])
        }
      }

      for (var key in itemTraits) {
        if (itemTraits.hasOwnProperty(key)) {
          
          if (!user.isBanned && await noblox.getOwnership(userid, key, "Badge")) {
            insight.push(itemTraits[key])
          }
              }
      }

      for (var key in matchTraits) {
        if (matchTraits.hasOwnProperty(key)) {
          
          if (String(user.username).toLowerCase().indexOf(key) > -1) {
            insight.push(matchTraits[key])
          }
        }
      }

      

      var profileThumbnail = (await noblox.getPlayerThumbnail(String(userid), 420, "png", false, "Headshot"))[0].imageUrl || ""

      var infoEmbed = new EmbedBuilder()

      if (user.isBanned === false) {
        infoEmbed.setTitle(`${user.username} (${userid}) - profile`)
        infoEmbed.setURL("https://www.roblox.com/users/" + userid + "/profile")
      } else {
        infoEmbed.setTitle(`~~${user.username} (${userid}) - profile~~`)
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
      
      message.reply({ embeds: [infoEmbed] }, true)
          } catch (err) {
console.log(err)

  message.reply("got an unexpected error", true)
}
    }
  }
}