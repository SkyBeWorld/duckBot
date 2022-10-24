const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user-info")
        .setDescription("userinfo.")
        .addUserOption(option => option.setName('user').setDescription('user').setRequired(true)),
    async execute(interaction, client) {
        try {
            await interaction.deferReply({ ephemeral: false })
            const member = interaction.options.getMember("user")

            let checkbot = " "; if(member.user.bot) checkbot = "✅"; else checkbot = "❌";

            const embed = new EmbedBuilder()
            .setTitle(`user info of ${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL({dynmaic: true}))
            .setColor("Green")
            .setDescription(`
            __**User Info**__

            - Name: ${member.user.toString()}
            - Tag: ${member.user.tag}
            - Id: ${member.user.id}
            - Bot: ${checkbot}


            __**Account Info**__

            - Account created: <t:${parseInt(member.user.createdTimestamp / 1000)}:R>
            - Joined the server:  <t:${parseInt(member.joinedAt / 1000)}:R>


            `)

            await interaction.editReply({embeds: [embed]})
        } catch (error) {
            console.log(`${error}`)
        }
    },
};