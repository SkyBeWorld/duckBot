const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("View help"),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Help")
            .setDescription("my prefix is slashCommand (/)")
            .setFields([
                {
                    name: "Info",
                    value: "__**ping**__ -> view the ping\n__**info**__ -> view info\n__**help**__ -> view help (this command)",
                    inline: false
                },
                {
                    name: "Moderation",
                    value: "__**ban**__ -> bans user\n__**kick**__ -> kick user\n__**^purge**__ -> clear message\n__**timeout**__ -> timeout someone\n__**untimeout**__ -> untimeout someone",
                    inline: false
                },
                {
                    name: "Outil",
                    value: "__**avatars**__ -> get avatar of someone\n__**say**__ -> send a message with the bot\n__**status**__ -> get the status of the bot\n**__patreons** -> get the patreons for support projects",
                    inline: false
                }
            ])

        await interaction.reply({
            embeds: [embed]
        });
    },
};