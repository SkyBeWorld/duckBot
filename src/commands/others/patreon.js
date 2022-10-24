const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("patreon")
        .setDescription("support duckbot project"),
    async execute(interaction, client) {

        await interaction.reply({
            content: "support duckbot project (thanks your for supporting): https://www.patreon.com/GeantWorld/membership",
        });
    },
}; 