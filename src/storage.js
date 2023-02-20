module.exports = {
  artifacts: ["Lannis Amulet", "Philospher's Stone", "Spider Cloak", "Fairfrozen", "Howler Friend"],
  races: ["Rigan", "Dzin", "Castellan", "Madraisan", "Gaian", "Fischeran", "Navaran", "Ashiin", "Haseldan", "Metalscroom" , "Dinakeri", "Vind", "Kasparan", "Morvid", "Azael", "Cameo"],
  classes: ["Abysswalker", "Dragon Sage" , "Oni" , "Shinobi", "Dark Sigil Knight" , "Sigil Knight Commander", "Faceless", "Druid", "Master Necromancer", "Master Illusionist", "Ronin", "Bard", "Lapidarist", "Monk Akuma", "Church Knight Spy" , "Spy Assassin"],
  edicts: ["Healer", "Seer", "Blademaster"],
  armors: ["Class Armor", "Knight Lord", "Grim Rogue"],
  privateservers: [  'bb61b45e',  '1967beef',  '4952b59b',  '52b149ad',  '894484db',  '555985b2',  '36c7f718',  '34a8d9ee', 'bac757dc', '974bc862', '51d2abeb', '138e182d', '3829beef', 'aac5c178', '8af58926', 'e5b7977c', "cae78447", '45faaab3', 'gaia_test',
                  'rogue_test', 'testing_server'],
  scripts: {
    "ActionCheck" : `
    local function ActionCheck(character)
       local effects = {"Stun", "ReturnStun", "Action", "Heavy"}

       for _, tag in pairs(character:GetChildren()) do
       if table.find(effects, tag.Name) then
          return true
       end

       if game:GetService("CollectionService"):HasTag(character, "Knocked") then return true end
       
       return false
    end`,
    "Activator": `
    local module = {}
    local cd = false
    
    function module.Activate(p1, p2, p3)
       if cd == true then return end

       cd = true

       task.spawn(function()
          task.wait(5)

          cd = false
       end)

       -- code can be ran under here
      
    end

    return module`,

  },
}