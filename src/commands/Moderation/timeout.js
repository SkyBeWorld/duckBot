const { SlashCommandBuilder, PermissionFlagsBits, ApplicationCommandOption, EmbedBuilder } =require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('timeout mentioned user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user you want to timeout')
                .setRequired(true),
        )
        .addNumberOption(option => option.setName('duration').setDescription('Enter a time (in minutes)').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Enter the reason')),
        async execute(interaction, client) {
            if (interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                const user = interaction.options.getMember('user');
                const member = interaction.guild.members.cache.get(user);
                const time = interaction.options.getNumber("duration")
                const reason = interaction.options.getString('reason') || 'no reason'
                if (interaction.member == user || user.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                    await interaction.reply('I can\'t timeout this member');
                }
                else {
                    const embed = new EmbedBuilder()
                    .setTitle("timeout Commands")
                    .setDescription("A Member has been timeout")
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
                            name: "duration",
                            value: `${time} minutes`,
                            inline: true
                        },
                        {
                            name: "Executed by",
                            value: `${interaction.user.tag}`,
                            inline: false
                        }
                    ])
        
                    await interaction.reply({
                        content: "This member has been time out",
                        ephemeral: true
                    });
                    await interaction.channel.send({
                        embeds: [embed]
                    })
                    user.timeout(time * 60 * 1000, reason).catch(console.error);
                }
            }
            else {
                await interaction.reply('you do not have permission to time out');
            }
        }
}