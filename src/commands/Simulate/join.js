const { SlashCommandBuilder, Client, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("simulate a join guild.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
        /**
         * @param {Client} client
         */
    async execute(interaction, client) {
        client.emit("guildMemberAdd", interaction.member)
        await interaction.reply({content: 'A new users joined the guild', ephemeral: true})
    },
};