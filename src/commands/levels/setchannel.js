const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js')
const channelDB = require("../../models/LevelUp")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-channel-level")
        .setDescription("set the channel for auto message")
        .addChannelOption(option => option.setName("channel").setDescription("the channel").addChannelTypes(ChannelType.GuildText).setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        

        const channel = interaction.options.getChannel("channel")

        channelDB.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            await interaction.deferReply({ ephemeral: true })

            if(data) data.delete()
            new channelDB({
                Guild: interaction.guild.id,
                Channel: channel
            }).save()
            
            return interaction.editReply({content: "success"})
        })


            
            

        
    },
};