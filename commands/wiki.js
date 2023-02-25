const { EmbedBuilder } = require("discord.js")
const noblox = require("noblox.js")
const axios = require("axios")
const cheerio = require("cheerio")

function splitMessage(message, chunkSize) {
  const chunks = [];

  for (let i = 0; i < message.length; i += chunkSize) {
    chunks.push(message.substring(i, i + chunkSize));
  }

  return chunks;
       }

module.exports = {
  name: "wiki",
  description: "searches something in the rogue lineage wiki",
  aliases: ["info", "rinfo", "rwiki"],
  cooldown: 2,
  cooldowns: [],
  async run(client, message, command, args) {  
   if (!args[0]) return message.reply("provide something like scholar or shinobi or something")

    try {

       const query = args.join(" ")
       const url = `https://rogue-lineage.fandom.com/wiki/${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const pageTitle = $('h1.page-header__title').text().trim();

      if (pageTitle === 'Search Results') {
        message.reply("can't find anything about that", true)
      }

      const pageUrl = response.request.res.responseUrl;
      const pageDescription = $('meta[name="description"]').attr('content');
      const thumbnailUrl = $('head > meta[property="og:image"]').attr('content');

      if (pageDescription && pageDescription.length > 1995) {
        pageDescription = pageDescription.slice(0, 1995) + '...';
      }

      const embeds = [];
      let content = '';
      $('p, h2').each((index, element) => {
        const text = $(element).text().trim();
        if (content.length + text.length > 2000) {
          embeds.push(new EmbedBuilder()
            .setColor('#FF8C00')
            .setTitle(pageTitle)
            .setURL(pageUrl)
            .setDescription(content)
            .setThumbnail(thumbnailUrl)
          );
          content = '';
        }
        content += text + '\n';
      });
      if (content) {
        embeds.push(new EmbedBuilder()
          .setColor('#e3e3e3')
          .setTitle(pageTitle)
          .setURL(pageUrl)
          .setDescription(content)
          .setThumbnail(thumbnailUrl)
        )
      }

      if (embeds.length === 0) {
        console.log('Could not generate any embeds');
      }

      for (const embed of embeds) {
        message.channel.send({embeds: [embed]}, true);
            }   } catch (err) {
      message.reply("page doesn't exist", true)

      console.log(err)
    }
    } catch(err) {
      console.log("WIKI.js - " + err)
    }
  } 
}