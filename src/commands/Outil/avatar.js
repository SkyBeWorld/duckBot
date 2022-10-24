const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatars")
        .setDescription("view the avatar of someone"),
    async execute(interaction, client) {
        const button = new ButtonBuilder() 
            .setLabel('more details !')
            .setURL('https://cdn.discordapp.com/attachments/801451657174974484/1005910898973610164/Discord_DPoPF8aonJ.gif')
            .setStyle(ButtonStyle.Link)

        const newMessage = `https://cdn.discordapp.com/attachments/980478976222973972/1005929942997024849/Discord_f11zKz1E8r.gif`;
        await interaction.reply({
            content: newMessage,
            components: [new ActionRowBuilder().addComponents(button)]
        });
    },
};