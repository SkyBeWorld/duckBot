const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("dm a valid member")
        .addUserOption(options => options.setName("user").setDescription("the user for dm").setRequired(true))
        .addStringOption(options => options.setName("message").setDescription("the message").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client, args) {


        const user = interaction.options.getMember("user")
        const dm = interaction.options.getString('message')

        user.send(dm).catch(async (err) => {
            console.log(err)

            return await interaction.reply({content: `Failed to send the message, please try again`, ephemeral: true})
        })

        await interaction.reply({content: `${dm} sent to ${user}`, ephemeral: true})
    },
};