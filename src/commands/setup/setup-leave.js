const { SlashCommandBuilder, Client, PermissionFlagsBits } = require('discord.js')
const welcomeSchema = require('../../models/Leave')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leave-setup')
    .setDescription('Setup a leave channel')
    .addChannelOption(option => option.setName('channel').setDescription('Select a channel').setRequired(true))
    .addStringOption(option => option.setName('message').setDescription('Enter a welcome message').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction, client, member) {
        let channel = interaction.options.getChannel('channel')
        if(!channel) {
            return interaction.reply({ content: "You need to mention a channel", ephemeral: true})
        }

        let welcomeMessage = interaction.options.getString('message')
        if(!welcomeMessage) {
            return interaction.reply({ content: "You need to give a leave message", ephemeral: true})
        }

        welcomeSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if(data) data.delete()
                new welcomeSchema({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                    Msg: welcomeMessage,
                }).save()

            interaction.reply({content: `Leave System Enabled\n Channel : ${channel} \n ${welcomeMessage}`})
        })
    }
}