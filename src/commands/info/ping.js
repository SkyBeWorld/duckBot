const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping api discord and bot."),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `Latence de l'API: ${client.ws.ping}ms\nLatence du BOT: ${message.createdTimestamp - interaction.createdTimestamp}ms`;
        await interaction.editReply({
            content: newMessage,
        });
    },
};