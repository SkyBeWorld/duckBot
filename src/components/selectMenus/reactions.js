const { EmbedBuilder } = require('discord.js')
const DB = require("../../models/ticketSetup")

module.exports = {
    data: {
        name: "reaction-roles"
    },
    async execute(interaction, client) {
        const { customId, values, guild, member } = interaction


        for (let i = 0; i < values.length; i++) {
            const roleId = values[i];
  
            const role = guild.roles.cache.get(roleId);
            const hasRole = member.roles.cache.has(roleId);
  
            switch (hasRole) {
              case true:
                member.roles.remove(roleId);
                break;
              case false:
                member.roles.add(roleId);
                break;
            }
          }
  
          interaction.reply({ content: "Roles updated.", ephemeral: true });
    }
}