const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("report a bug"),
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setTitle("bug report")
            .setCustomId("report")
        const text = new TextInputBuilder()
            .setCustomId("problem")
            .setLabel("the problem")
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)

            const firstActionRow = new ActionRowBuilder().addComponents(text);
      
            modal.addComponents(firstActionRow)


        await interaction.showModal(modal)
    },
};