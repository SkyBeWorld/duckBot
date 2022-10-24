const { SlashCommandBuilder, PermissionFlagsBits, ApplicationCommandOption, EmbedBuilder } =require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('bans mentioned user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user you want to ban')
                .setRequired(true),
        )
        .addStringOption(option => option.setName('reason').setDescription('Enter the reason')),
        async execute(interaction, client) {
            if (interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
                const user = interaction.options.getMember('user');
                const member = interaction.guild.members.cache.get(user);
                const reason = interaction.options.getString('reason') || 'no reason'
                if (interaction.member == user || user.permissions.has(PermissionFlagsBits.BanMembers)) {
                    await interaction.reply('I can\'t ban this member');
                }
                else {
                    
                    const embed = new EmbedBuilder()
                    .setTitle("ban Commands")
                    .setDescription("A Member has been banned")
                    .setColor("Red")
                    .setFields([
                        {
                            name: "User",
                            value: `${user}`,
                            inline: true
                        },
                        {
                            name: "Reason",
                            value: `${reason}`,
                            inline: true
                        },
                        {
                            name: "Executed by",
                            value: `${interaction.user.tag}`,
                            inline: false
                        }
                    ])
        
                    user.kick({reason: reason});
                    await interaction.reply({
                        content: "This member has been banned",
                        ephemeral: true
                    });
                    await interaction.channel.send({
                        embeds: [embed]
                    })
                    user.ban({reason: reason});
                }
            }
            else {
                await interaction.reply('you do not have permission to ban');
            }
        }
}