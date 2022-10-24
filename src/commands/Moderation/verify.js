const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const DB = require("../../models/verification")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify-setup")
        .setDescription("verify setup")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel').setRequired(false))
        .addStringOption(option => option.setName('description').setDescription('Enter a message').setRequired(false))
        .addStringOption(option => option.setName('title').setDescription('Enter a title').setRequired(false))
        .addStringOption(option => option.setName('button-message').setDescription('Enter a button message').setRequired(false)),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true })

        const { options, guild, channel } = interaction

        const role = options.getRole("role")
        const Channel = options.getChannel("channel") || channel
        let message = interaction.options.getString('description')
        let title = interaction.options.getString('title')
        let Btn = interaction.options.getString('button-message')

        let Data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!Data) {
            Data = new DB({
                Guild: guild.id,
                Role: role.id,
                BtnMessage: Btn,
                Description: message,
                Title: title
            })

            await Data.save()
        } else {
            Data.Role = role.id
            await Data.save()
        }

        Channel.send({
            embeds: [
                new EmbedBuilder()
                .setTitle(title || "Verification")
                .setColor("DarkGrey")
                .setDescription(message || "Click on the button to verify")
                .setTimestamp()
            ],
            components: [
                new ActionRowBuilder().addComponents(

                    new ButtonBuilder()
                    .setCustomId("verifybtn")
                    .setLabel(Btn || "Verify")
                    .setStyle(ButtonStyle.Success)
                )
            ]
        })

        return interaction.editReply({content: "Success"})
    },
};