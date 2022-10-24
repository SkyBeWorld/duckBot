const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server-info")
        .setDescription("server info"),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false })
        const embed = new EmbedBuilder()
            .setTitle("server info")
            .setDescription('all info on this server')
            .setThumbnail(interaction.guild.iconURL())
            .addFields([
                {
                    name: 'general',
                    value: `
                    
                    Name: ${interaction.guild.name}
                    Created <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>
                    Owner: <@${interaction.guild.ownerId}>

                    Description: ${interaction.guild.description || 'No description'}
                    
                    `,
                    inline: false,
                },
            ])
            .addFields([
                {
                    name: '😀 | Total Users',
                    value: 
                    `
                    - Members: ${interaction.guild.members.cache.filter(member => !member.user.bot).size}
                    - Bot: ${interaction.guild.members.cache.filter(member => member.user.bot).size}
                    

                    Total: ${interaction.guild.memberCount}
                    `,
                    inline: false,
                }, 
                {
                    name: '⌨ | Channels',
                    value: 
                    `
                    - Text : ${interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size}
                    - Voice : ${interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}
                    - Thread: ${interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildPublicThread && ChannelType.GuildPrivateThread && ChannelType.GuildNewsThread).size}
                    - Category: ${interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}
                    - Stages : ${interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}
                    - News : ${interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildNews).size}


                    Total: ${interaction.guild.channels.cache.size}

                    
                    `,
                    inline: false
                },
                {
                    name: "🤪| Emojis & Sticker",
                    value: `
                    - Aminated : ${interaction.guild.emojis.cache.filter((e => e.animated)).size}
                    - Static : ${interaction.guild.emojis.cache.filter((e => !e.animated)).size}
                    - Stickers : ${interaction.guild.stickers.cache.size}


                    Total : ${interaction.guild.emojis.cache.size + interaction.guild.stickers.cache.size}


                    `,
                },
                {
                    name: "✨ | Nitro Statisitcs",
                    value: `
                    - Roles : ${interaction.guild.roles.cache.size}
                    - Boosts: ${interaction.guild.premiumSubscriptionCount}
                    - Boosters: ${interaction.guild.members.cache.filter((m => m.premiumSince)).size}
                    
                    `
                }
            ])
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: interaction.user.displayAvatarURL(),
                text: interaction.user.tag
            })
            .setColor("Green")

        await interaction.editReply({
            embeds: [embed]
        });
    },
};