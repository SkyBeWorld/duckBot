const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, PermissionsBitField } = require('discord.js')
const Schema = require('../../models/member-count')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-channel-membercount")
        .setDescription("create channel for membercount.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(data) data.delete()
            const channel = await interaction.guild.channels.create({
                name: `Member: ${interaction.guild.memberCount}`,
                type: ChannelType.GuildVoice,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.Connect]
                    },
                ],
            })

            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Member: interaction.guild.memberCount
            }).save()
        })

        await interaction.reply({content: "Success", ephemeral: true})
    },
};