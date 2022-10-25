const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const warnModel = require("../../models/WarningDB")
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warnings")
        .setDescription("view all warns")
        .addUserOption(options => options.setName("target").setDescription("the member to warn").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser("target")

        const userWarnings = await warnModel.find({
            UserID: user.id,
            GuildID: interaction.guildId,
        })

        if (!userWarnings?.length) return interaction.reply({content: `${user} has no warnings in the server`, ephemeral: true})

        const embedDescription = userWarnings.map((warn) => {
            const mods = interaction.guild.members.cache.get(warn.ModeratorID)

            return [
                `WarnId: ${warn._id}`,
                `Moderator: ${mods || "Has left"}`,
                `Reason: ${warn.Reason}`
            ].join("\n")
        }).join("\n\n")

        const embed = new EmbedBuilder()
            .setTitle(`${user.tag}'s warnings`)
            .setDescription(embedDescription)
            .setColor("Random")

        interaction.reply({embeds: [embed]})
    },
};