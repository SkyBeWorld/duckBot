const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const warnModel = require("../../models/WarningDB")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-warn")
        .setDescription("remove warn a member")
        .addStringOption(options => options.setName("warnid").setDescription("warnid that you want to delete").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        const warnid = interaction.options.getString("warnid")

        const data = await warnModel.findById(warnid)

        if (!data) return interaction.reply({content: `${warnid} is not a valid id`, ephemeral: true})

        data.delete()

        const user = interaction.guild.members.cache.get(data.UserID)
        return interaction.reply({content: `Removed 1 of ${user}'s warnings`, ephemeral: true})
    },
};