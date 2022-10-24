const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, ChannelType, PermissionsBitField } = require("discord.js")
const DB = require("../../models/ticket")
const TS = require("../../models/ticketSetup")

module.exports = {
    data: {
        name: "ticket"
    },
    async execute(interaction, client) {
        const { guild, member, customId } = interaction

        const Data = await TS.findOne({GuildID: guild.id})
        if(!Data) return console.log("this server has not data")

        const ID = Math.floor(Math.random() * 90000) + 10000

        await guild.channels.create({
            name: `ticket-${ID}`, 
            type: ChannelType.GuildText,
            parent: Data.Category,
            permissionOverwrites:[
                {
                    id: member.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AddReactions]
                },
                {
                    id: Data.Everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AddReactions]
                }
            ]
        }).then(async (channel) => {
            await DB.create({
                GuildID: guild.id,
                MembersID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                Type: customId,
                Claimed: false,
            })

            const Embed = new EmbedBuilder()
            .setAuthor({
                name: `${guild.name} | Ticket: ${ID}`,
                iconURL: `${guild.iconURL({dynamic: true})}`
            })
            .setDescription("please wait, a staff will response")
            .setFooter({text: `Button is only for admin`})
    
    
            const Buttons = new ActionRowBuilder()
            Buttons.addComponents(
                new ButtonBuilder()
                .setCustomId("close")
                .setLabel("save and close ticket")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("🎫"),
                new ButtonBuilder()
                .setCustomId("lock")
                .setLabel("lock")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("🎫"),
                new ButtonBuilder()
                .setCustomId("unlock")
                .setLabel("unlock")
                .setStyle(ButtonStyle.Success)
                .setEmoji("🎫"),
                new ButtonBuilder()
                .setCustomId("claim")
                .setLabel("claim")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("🎫"),
            )
    
            channel.send({content: `${member} here is your ticket`, embeds: [Embed], components: [Buttons]})
    
            interaction.reply({content: `${member} your ticket has been created: ${channel}`, ephemeral: true})
        })
    }
}