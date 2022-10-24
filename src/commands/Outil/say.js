const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('say a message with the bot')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option => option.setName('message').setDescription('the message to say').setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true })

        const msg = interaction.options.getString('message');
        await interaction.editReply({
            content: "msg sent",
        });
        interaction.channel.send({content: `${msg}`})
    }
    
}