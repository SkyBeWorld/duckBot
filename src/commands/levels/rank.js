const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const lvlDB = require("../../models/level")
const ChannelDB = require("../../models/LevelUp")
const Canvacord = require('canvacord')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("level")
        .setDescription("view your level")
        .addUserOption(option => option.setName("user").setDescription("view user rank")),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false })

        const { user, guild } = interaction

        const Member = interaction.options.getUser("user") || user;
        const member = guild.members.cache.get(Member.id)

        const Data = await lvlDB.findOne({Guild: guild.id, User: member.id}).catch(err => {  })
        if (!Data) return interaction.editReply({content: `${member} has not gained any XP`})


        const required = Data.Level * Data.Level * 100 + 100

        const rank = new Canvacord.Rank()
        .setAvatar(member.displayAvatarURL({ forceStatic: true }))
        .setBackground("IMAGE", "https://media.discordapp.net/attachments/1003767074449014904/1020639637821194240/unknown.png")
        .setCurrentXP(Data.XP)
        .setRequiredXP(required)
        .setRank(1, "Rank", false)
        .setStatus(member.presence.status)
        .setLevel(Data.Level, "Level")
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)

        const Card = await rank.build().catch(err => console.log(err))

        const attachment = new AttachmentBuilder(Card, { name: "level.png" })

        const Embed = new EmbedBuilder()
        .setColor('DarkGold')
        .setTitle(`${member.user.username}'s Level Card`)
        .setImage("attachment://level.png")

        await interaction.editReply({ embeds: [Embed], files: [attachment] })
    },
};