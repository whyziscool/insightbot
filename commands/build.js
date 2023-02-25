const { EmbedBuilder } = require("discord.js");
const noblox = require('noblox.js');

function chooseWithException(table, auth) {
  var newTable = table.filter(value => auth.includes(value))
  
  return newTable[Math.floor(Math.random() * newTable.length)];
}

function giveBuild(client, message, args) {
  const storage = client.storage;
    const races = storage.races;
    const classes = storage.classes;
    const artifacts = storage.artifacts;

    let chosenRace = races[Math.floor(Math.random() * races.length)]

    if (args && args[0]) {
      chosenRace = args[0] ? args[0].toLowerCase().charAt(0).toUpperCase() + args[0].slice(1) : chooseWithException(races, []);
    if (!races.includes(chosenRace)) {
      message.reply(`could not find race in table called ${chosenRace}`);
      
      return [false] 
    }}

    var authClasses;
    switch (chosenRace) {
      case "Rigan":
        authClasses = ["Dragon Sage", "Master Necromancer", "Master Illusionist", "Oni", "Lapidarist", "Faceless"];
        break;
      case "Construct":
       authClasses = ["Druid", "Whisperer", "Shinobi" , "Sigil Knight Commander", "Dragon Sage", "Bard", "Dark Sigil Knight"]
        break;
      case "Azael":
        authClasses = ["Whisperer", "Shinobi", "Druid", "Sigil Knight Commander", "Bard", "Dark Sigil Knight" , "Master Illusionist", "Master Necromancer"];
        break;
      case "Dinakeri":
        authClasses = ["Dark Sigil Knight", "Druid", "Oni", "Whisperer", "Faceless", "Deep Knight"]
        break;
      case "Castellan":
        authClasses = ["Dark Sigil Knight", "Druid", "Master Illusionist", "Dragon Sage", "Shinobi", "Oni", "Bard", "Ronin"];
        break;
      case "Navaran":
        authClasses = ["Dragon Sage", "Dragon Slayer", "Deep Knight", "Monk Akuma"];
        break;
      case "Gaian":
 authClasses = ["Oni", "Dragon Sage" , "Shinobi", "Ronin"]
break;
      case "Morvid":
      case "Ashiin":
        authClasses = ["Oni", "Dragon Sage", "Shinobi", "Ronin", "Faceless", "Deep Knight"];
        break;
      case "Cameo":
        authClasses = ["Oni", "Shinobi", "Ronin", "Lapidarist", "Deep Knight"];
        break;
      default:
authClasses = ["Oni", "Shinobi", "Ronin", "Lapidarist", "Master Necromancer", "Faceless", "Master Illusionist", "Dragon Slayer", "Deep Knight", "Bard"];
        break;
    }

    const chosenClass = chooseWithException(classes, authClasses);

    var emulate = false;
    var chosenArtifact = false;
    var authArtifacts = [];
    switch (chosenClass) {
      case "Oni":
      case "Dragon Sage":
      case "Sigil Knight Commander":
      case "Shinobi":
        authArtifacts = ["Lannis Amulet" , "Spider Cloak"]
        break;
      case "Faceless":
        chosenArtifact = "Lannis Amulet"

        break;
      case "Whisperer":
        authArtifacts = ["Lannis Amulet", "Howler Friend"]
        
        break;
      case "Master Necromancer":
      case "Master Illusionist":
      case "Druid":
chosenArtifact = "Philospher's Stone"

        break;
      case "Monk Akuma":
        chosenArtifact = "Fairfrozen"

        break;
      default:
        authArtifacts = ["Lannis Amulet", "Spider Cloak"]
      
    }

    if (!chosenArtifact) {
      chosenArtifact = chooseWithException(artifacts, authArtifacts)
    }

    if (chosenRace === "Navaran") {
    if (chosenClass === "Oni") {
       emulate = "Lightning Drop"
    } else if (chosenClass === "Dragon Sage" || chosenClass === "Druid" || chosenClass === "Master Illusionist") {
       emulate = "Demon Flip"
    } else if (chosenClass === "Faceless" || chosenClass === "Sigil Knight Commander") {
      emulate = "Dark Sigil Helmet"
    } else if (chosenClass === "Whisperer") {
emulate = "Shadow Rush"
    } else if (chosenClass === "Monk Akuma" || chosenClass === "Dragon Slayer") {
emulate = "Light Piercer"
    } else {
      emulate = "couldn't generate one"
    }}

    const shouldBecomeVampire = Math.random() < 0.5;
const noVamp = ["Lich", "Scroom", "Gaian", "Cameo", "Metalscroom", "Fischeran", "Vind", "Azael"];
var isVampire = !noVamp.includes(chosenRace) && shouldBecomeVampire;

if (isVampire) { isVampire = "yes" }
if (!isVampire) { isVampire = "no" }

const classToImage = {
  "Bard": "https://media.discordapp.net/attachments/1077015311926177904/1077262822217633842/image0.jpg",
  "Shinobi": "https://media.discordapp.net/attachments/1077015311926177904/1077263401014800424/image0.gif",
  "Ronin": "https://media.discordapp.net/attachments/1077015311926177904/1077262924986470490/image0.jpg",
  "Master Necromancer": "https://media.discordapp.net/attachments/1077015311926177904/1077265250514128956/image0.gif",
  "Master Illusionist": "https://media.discordapp.net/attachments/1077015311926177904/1077265250514128956/image0.gif",
  "Lapidarist": "https://media.discordapp.net/attachments/1077015311926177904/1077264770480230451/image0.gif",
  "Dark Sigil Knight": "https://media.discordapp.net/attachments/1077015311926177904/1077264786322116608/image0.jpg",
  "Sigil Knight Commander": "https://media.discordapp.net/attachments/1077015311926177904/1077265943404757113/image0.jpg",
  "Druid": "https://media.discordapp.net/attachments/1077015311926177904/1077265931677466654/image0.gif",
  "Faceless": "https://media.discordapp.net/attachments/1077015311926177904/1077265379933573271/image0.gif"
};
const defaultImage = "https://media.discordapp.net/attachments/1077015311926177904/1077264770480230451/image0.gif";
const imgT = classToImage[chosenClass] || defaultImage;

  return [chosenRace, chosenClass, chosenArtifact, isVampire, imgT, emulate]
}



module.exports = {
  name: "build",
  description: "gives a rogue lineage build",
  aliases: ["buildidea", "build", "rbuild", "buildorbust"],
  cooldown: 3,
  cooldowns: [],
  async run(client, message, command, args) {
    var data = giveBuild(client, message, args)

 if (data[0] === false) return;
    
    var chosenRace = data[0]
    var chosenClass = data[1]
    var chosenArtifact = data[2]
    var isVampire = data[3]
    var imgT = data[4]
    var emulate = data[5]
    
    var infoembed = new EmbedBuilder()
    infoembed.setTitle("rogue lineage: " + chosenClass + " build")
    infoembed.setColor("#e3e3e3")
    infoembed.setDescription("keep in mind it generates randomly and has some adjusting so it won't give the best build in first try")
    infoembed.setThumbnail(imgT)
    infoembed.addFields(
      { name: "Race", value: String(chosenRace) },
      { name: "Class", value: String(chosenClass) },
      { name: "Artifact", value: String(chosenArtifact) },
      { name: "Vampire", value: String(isVampire) }
    )

      if (chosenRace === "Navaran") {
infoembed.addFields(
  {name: "Emulate", value: String(emulate)}
  )
      }

    var msg = await message.reply({ embeds: [infoembed] }, true)

    msg.react('✅').then(() => msg.react('❌'));

const filter = (reaction, user) => {
	return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
};
msg.awaitReactions({ filter, max: 1, time: 600000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '✅') {
			message.reply('i sent the build to your dms', true);
if (message.author.id === "584774112120143964") {
message.author.send("https://cdn.discordapp.com/attachments/523282321303142400/1077288914794061925/rapidsave.com_trunk_shaker-9dptup9ireia1.mp4")
} else {
message.author.send({embeds: [msg.embeds[0]]})
}
		} else {
			var data = giveBuild(client, message, args)
    var chosenRace = data[0]
    var chosenClass = data[1]
    var chosenArtifact = data[2]
    var isVampire = data[3]
    var imgT = data[4]
    var emulate = data[5]
    
    var infoembed = new EmbedBuilder()
    infoembed.setTitle("rogue lineage: " + chosenClass + " build")
    infoembed.setColor("#e3e3e3")
    infoembed.setDescription("keep in mind it generates randomly and has some adjusting so it won't give the best build in first try")
    infoembed.setThumbnail(imgT)
    infoembed.addFields(
      { name: "Race", value: String(chosenRace) },
      { name: "Class", value: String(chosenClass) },
      { name: "Artifact", value: String(chosenArtifact) },
      { name: "Vampire", value: String(isVampire) }
    )

      if (chosenRace === "Navaran") {
infoembed.addFields(
  {name: "Emulate", value: String(emulate)}
  )
      }

    msg.edit({ embeds: [infoembed] }, true)
		}
	})
	.catch(collected => {
	console.log("did not react in time")
	});
    

  

  }
}