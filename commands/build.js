const { EmbedBuilder } = require("discord.js")
const noblox = require('noblox.js')

function chooseWithException(table, auth) {
  var actualTable = []

  for (var value of table) {
    if (auth.indexOf(value) > -1) {
      actualTable.push(value)
    }
  }

  return actualTable[Math.floor(Math.random() * actualTable.length)];
}

module.exports = {
  name: "build",
  description: "gives a rogue lineage build",
  aliases: ["buildidea", "build", "rbuild", "buildorbust"],
  cooldown: 3,
  cooldowns: [],
  async run(client, message, command, args) {
    var source = client.storage

    var chosenRace = source["races"][Math.floor(Math.random() * source["races"].length)]
    var authClass = false

    if (args[0]) {
      var hey = args[0].toLowerCase()

      hey = hey.charAt(0).toUpperCase() + hey.slice(1)
      
      if (source["races"].indexOf(hey) > -1) {
        chosenRace = hey
      } else {
        message.reply("could not find race in table called " + hey, true);

        return
      }
    }
    
    if (chosenRace === "Rigan") {
      authClass = ["Dragon Sage", "Master Necromancer", "Master Illusionist", "Oni" , "Lapidarist", "Faceless"]
    }


    if (chosenRace === "Construct" || chosenRace === "Azael") {
      authClass = ["Whisperer", "Shinobi", "Druid", "Sigil Knight Commander", "Bard"]
    }

    if (chosenRace === "Dinakeri" || chosenRace === "Castellan") {
      authClass = ["Dark Sigil Knight", "Druid", "Master Illusionist", "Dragon Sage", "Shinobi", "Oni", "Bard", "Ronin"]
    }

    if (chosenRace === "Rigan") {
      authClass = ["Dragon Sage", "Master Necromancer", "Master Illusionist"]
    }

    if (chosenRace === "Navaran") {
      authClass = ["Dragon Sage", "Dragon Slayer", "Deep Knight"]
    }

    if (chosenRace === "Gaian" || chosenRace === "Ashiin") {
      authClass = ["Oni", "Dragon Sage", "Shinobi", "Ronin"]
    }

    if (chosenRace === "Kasparan") {
      authClass = ["Dragon Sage", "Master Necromancer", "Master Illusionist", "Lapidarist", "Ronin", "Bard"]
    }

    if (chosenRace === "Fischeran") {
      authClass = ["Shinobi", "Faceless", "Dragon Slayer", "Deep Knight", "Whisperer"]
    }

        if (chosenRace === "Metalscroom") {
      authClass = ["Shinobi", "Faceless", "Dragon Slayer", "Deep Knight", "Whisperer"]
        }

    if (chosenRace === "Morvid") {
      authClass = ["Faceless", "Master Necromancer", "Deep Knight"]
    }

    if (!authClass) {
      authClass = ["Oni", "Shinobi", "Ronin", "Lapidarist", "Master Necromancer", "Faceless", "Master Illusionist", "Dragon Slayer", "Deep Knight", "Bard"]
    }

      var chosenClass = chooseWithException(source.classes, authClass)
      var authArtifact = false
      var chosenArtifact = "null"

      if (chosenClass === "Oni" || chosenClass === "Dragon Sage" || chosenClass === "Sigil Knight Commander" || chosenClass === "Shinobi" || chosenClass === "Faceless" || chosenClass === "Whisperer") {
        authArtifact = ["Spider Cloak", "Lannis Amulet", "Howler Friend"]
      }

      if (chosenClass === "Deep Knight" || chosenClass === "Dragon Slayer" || chosenClass === "Bard") {
        authArtifact = ["Fairfrozen", "Lannis Amulet"]
      }

    if (chosenClass === "Monk Akuma") {
chosenArtifact = "Fairfrozen"
    }

      if (chosenClass === "Master Illusionist" || chosenClass === "Master Necromancer" || chosenClass === "Druid") {
        chosenArtifact = "Philospher's Stone"
      }
      if (chosenClass === "Lapidarist" || chosenClass === "Ronin") {
        chosenArtifact = "Lannis Amulet"
      }

      if (chosenRace === "Morvid") {
        chosenArtifact = "Lannis Amulet"
      }

      if (!authArtifact) {
        authArtifact = ["Fairfrozen", "Lannis Amulet", "Spider Cloak"]
      }

      if (chosenArtifact === "null") {
        chosenArtifact = chooseWithException(source.artifacts, authArtifact)
      }

      var chosenState = "false"

      if (Math.floor(Math.random() * 2) === 2) {
        chosenState = "true"
      }


      var noVamp = ["Lich", "Scroom", "Gaian", "Cameo", "Metalscroom", "Fischeran", "Vind", "Azael"]

      if (noVamp.indexOf(chosenRace)) {
        chosenState = "false"
      }

var imgT

    if (chosenClass === "Bard") {
      imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077262822217633842/image0.jpg"
    } else if (chosenClass === "Shinobi") {
imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077263401014800424/image0.gif"
    } else if (chosenClass === "Ronin") {
imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077262924986470490/image0.jpg"
    } else if (chosenClass === "Master Necromancer" || chosenClass === "Master Illusionist") {
      imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077265250514128956/image0.gif"
      } else if (chosenClass === "Lapidarist") {
imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077264770480230451/image0.gif"
    } else if (chosenClass === "Dark Sigil Knight") {
      imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077264786322116608/image0.jpg"
    } else if (chosenClass === "Sigil Knight Commander") {
      imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077265943404757113/image0.jpg"
    } else if (chosenClass === "Druid") {
imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077265931677466654/image0.gif"
    } else if (chosenClass === "Faceless") {
      imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077265379933573271/image0.gif"
    }

    if (imgT === false) {
      imgT = "https://media.discordapp.net/attachments/1077015311926177904/1077264770480230451/image0.gif"
    }
      
    var infoembed = new EmbedBuilder()
      infoembed.setTitle("rogue lineage: " + chosenClass + " build")
    infoembed.setColor("#e3e3e3")
      infoembed.setDescription("keep in mind it generates randomly and has some adjusting so it won't give the best build in first try")
    infoembed.setThumbnail(imgT)
      infoembed.addFields(
        { name: "Race", value: chosenRace },
        { name: "Class", value: chosenClass },
        { name: "Artifact", value: chosenArtifact },
        { name: "Vampire", value: chosenState }
      )

      var msg = await message.reply({ embeds: [infoembed] }, true)

      msg.react("✅")
      msg.react("❌")

  }
}