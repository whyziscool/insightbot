module.exports = {
  artifacts: ["Lannis Amulet", "Philospher's Stone", "Spider Cloak", "Fairfrozen", "Howler Friend"],
  races: ["Rigan", "Dzin", "Castellan", "Madraisan", "Gaian", "Fischeran", "Navaran", "Ashiin", "Haseldan", "Metalscroom" , "Dinakeri", "Vind", "Kasparan", "Morvid", "Azael", "Cameo", "Construct"],
  classes: ["Abysswalker", "Dragon Sage" , "Oni" , "Shinobi", "Dark Sigil Knight" , "Sigil Knight Commander", "Faceless", "Druid", "Master Necromancer", "Master Illusionist", "Ronin", "Bard", "Lapidarist", "Monk Akuma", "Church Knight Spy" , "Spy Assassin"],
  edicts: ["Healer", "Seer", "Blademaster"],
  armors: ["Class Armor", "Knight Lord", "Grim Rogue"],
  privateservers: [  'bb61b45e',  '1967beef',  '4952b59b',  '52b149ad',  '894484db',  '555985b2',  '36c7f718',  '34a8d9ee', 'bac757dc', '974bc862', '51d2abeb', '138e182d', '3829beef', 'aac5c178', '8af58926', 'e5b7977c', "cae78447", '45faaab3', 'caedeace'],
  sources: [
  {
    name: "TBD",
    description: "this one got leaked by notadev",
    source: "https://mega.nz/file/fQxV2KZJ" ,
    key: process.env.TBD_KEY,
    state: "#",
    requirement: 25,
    },
    {
    name: "rogue lineage obby",
      description: "very old copy made by people I forgot but it's based off rlt",
    source: "https://mega.nz/file/nYRlBKLR" ,
    state: "?",
    statescript: `this MAY contain a backdoor, please run this script in the command bar when you launch the studio app:\n\n` + "```" + `game:GetService("ReplicatedStorage").Actor:ClearAllChildren()` + '```\n\nenjoy -aisar',
    key: process.env.OBBY_KEY,
    requirement: 10,
    },
        {
    name: "tales from the valley",
      description: "an accurate copy of tales from the valley with working server-side scripts",
    source: "https://mega.nz/file/GJIWUKyD" ,
    state: "#",
    key: process.env.TALES_KEY,
    requirement: 30,
    },
    {
    name: "early sanctum",
      description: "basically an old copy of friendship is magic can be useful", source: "https://mega.nz/file/vV5RVI5J" ,
    state: "#",
    key: process.env.SANCTUM_KEY,
    requirement: 15,
    },
    {
      name: "friendship is magic",
      description: "latest copy of fim",
      source: "https://mega.nz/file/OVAwlCoL",
      key: process.env.FIM_KEY,
      requirement: 20,
      state: "?",
      statescript: "please be aware this may have a backdoor and enjoy -aisar"   
},
        {
      name: "inspectrum",
      description: "latest copy of inspectrum (really trash old but fun copy)",
      source: "https://mega.nz/file/yQY0jYzS",
      key: process.env.INSPECTRUM_KEY,
      requirement: 15,
      state: "#",
},
    {
      name: "gaming worl",
      description: "semi rlt copy idk but it has enchants and stuff",
      source: "https://mega.nz/file/mRZBwJpJ",
      key: process.env.GAMING_KEY,
      requirement: 25,
      state: "?",
      statescript: "if you find a backdoor report it to me please - aisar"
    },
    {
      name: "epsilon lineage",
      description: "not recent but it has some of the classes",
      source: "https://mega.nz/file/CIBlmYAA",
      requirement: 25,
      key: process.env.EPSILON_KEY,
      state: "#",
    },
    {
      name: "rogue lineage tycoon",
      description: "not a recent copy, it has the base though",
      source: "https://mega.nz/file/3VQm1RJZ",
      state: "#",
      requirement: 23,
      key: process.env.RLT_KEY,
    },
      {
        name: "rogue survival map",
        description: "this is the map not the game itself",
        source: "https://mega.nz/file/2dw0BTBR",
        state: "#",
        requirement: 23,
        key: process.env.SURVIVAL_KEY
      }
    
    
    ]
}