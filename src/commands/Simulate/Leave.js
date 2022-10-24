const { SlashCommandBuilder, Client, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("simulate a leave guild.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
        /**
         * @param {Client} client
         */
    async execute(interaction, client) {
        client.emit("guildMemberRemove", interaction.member)
        await interaction.reply({content: 'A new users left the guild', ephemeral: true})
    },
};