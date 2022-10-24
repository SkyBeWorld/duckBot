const { SlashCommandBuilder, PermissionFlagsBits, ApplicationCommandOption, EmbedBuilder } =require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('untimeout mentioned user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user you want to untimeout')
                .setRequired(true),
        ),
        async execute(interaction, client) {
            if (interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                const user = interaction.options.getMember('user');
                const member = interaction.guild.members.cache.get(user);
                if (interaction.member == user || user.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                    await interaction.reply('I can\'t untimeout this member');
                }
                else {
                    const embed = new EmbedBuilder()
                    .setTitle("untimeout Commands")
                    .setDescription("A Member has been untimeout")
                    .setColor("Green")
                    .setFields(
                        {
                            name: "user",
                            value: `${user}`,
                            inline: true,
                        },
                        {
                            name: "interaction type",
                            value: "Untimeout",
                            inline: true,
                        },
                        {
                            name: "Executed by",
                            value: `${interaction.user.tag}`,
                            inline: false
                        }
                    )
        
                    await interaction.reply({
                        content: "This member has been untimeout",
                        ephemeral: true
                    });
                    await interaction.channel.send({
                        embeds: [embed]
                    })
                    user.timeout(null).catch(console.error);
                }
            }
            else {
                await interaction.reply('you do not have permission to untimeout');
            }
        }
}