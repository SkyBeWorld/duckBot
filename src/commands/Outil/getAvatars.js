const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Avatar")
        .setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Avatar")
            .setDescription(`the avatar of <@${interaction.targetUser.id}>`)
            .setColor("Green")
            .setImage(`${interaction.targetUser.displayAvatarURL()}`)
        



        await interaction.reply({
            embeds : [embed]
        })
    },
};