const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const lvlDB = require("../../models/level")
const ChannelDB = require("../../models/LevelUp")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reset-xp")
        .setDescription("reset xp of the guild")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {

        lvlDB.findOne({Guild: interaction.guild.id}, async (err, data) => { 
            await interaction.deferReply({ ephemeral: true })
            if(!data) return interaction.editReply({content: "No data found"})
           
           
            data.delete()
           
           await interaction.editReply({content: `data has been deleted from the database !`})
        })
        

        
    },
};