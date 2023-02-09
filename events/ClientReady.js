const { Events } = require('discord.js');

const sqlite3 = require("better-sqlite3");
const db = new sqlite3("./database/clownery.db")

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
console.log(`logged in as ${client.user.tag}`)

  const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'clownery';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    db.prepare("CREATE TABLE clownery (id TEXT PRIMARY KEY, message TEXT, weirdamount INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    db.prepare("CREATE UNIQUE INDEX idx_scores_id ON clownery (id);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  client.getDB = db.prepare("SELECT * FROM clownery WHERE id = ?");
  client.setDB = db.prepare("INSERT OR REPLACE INTO clownery (id, message, weirdamount) VALUES (@id, @message, @weirdamount);");

  client.guilds.fetch()
  client.deadlands = client.guilds.cache.get("1052305529021665411")
  client.clownery = client.deadlands.channels.cache.get("1073043301256675368")
  }
};