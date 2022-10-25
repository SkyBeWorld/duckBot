const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const warnModel = require("../../models/WarningDB")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("warn a member")
        .addUserOption(options => options.setName("target").setDescription("the member to warn").setRequired(true))
        .addStringOption(options => options.setName("reason").setDescription("the reason").setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser("target")
        const reason = interaction.options.getString("reason") ||"No Reason"

        new warnModel({
            UserID: user.id,
            GuildID: interaction.guildId,
            ModeratorID: interaction.user.id,
            Reason: reason,
        }).save()

        user.send(`You have been warned in ${interaction.guild.name}`).catch(console.log)

        interaction.reply({content: `${user} has been warned for ${reason}`, ephemeral: true})
    },
};