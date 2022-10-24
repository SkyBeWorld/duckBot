const { SlashCommandBuilder, PermissionFlagsBits, ApplicationCommandOption, EmbedBuilder } =require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kicks mentioned user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user you want to kick')
                .setRequired(true),
        )
        .addStringOption(option => option.setName('reason').setDescription('Enter the reason')),
        async execute(interaction, client) {
            if (interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
                const user = interaction.options.getMember('user');
                const member = interaction.guild.members.cache.get(user);
                const reason = interaction.options.getString('reason' ) || 'no reason';
                if (interaction.member == user || user.permissions.has(PermissionFlagsBits.KickMembers)) {
                    await interaction.reply({content: 'I can\'t kick this member', ephemeral: true});
                }
                else {
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Kick Commands")
                    .setDescription("A Member has been kicked")
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
                        content: "This member has been kicked",
                        ephemeral: true
                    });
                    await interaction.channel.send({
                        embeds: [embed]
                    })
                }
            }
            else {
                await interaction.reply({content: 'you do not have permission to kick', ephemeral: true});
            }
        }
}