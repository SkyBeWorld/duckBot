const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, ChannelType, PermissionsBitField , PermissionFlagsBits} = require("discord.js")
const DB = require("../../models/ticket")
const { createTranscript } = require("discord-html-transcripts")
const TS = require("../../models/ticketSetup")

module.exports = {
    data: {
        name: "claim"
    },
    async execute(interaction, client) {
        const { guild, customId, channel, member } = interaction

        const Data = await TS.findOne({GuildID: guild.id})
        if(!Data) return

        const Embed = new EmbedBuilder().setColor("Blue")

        DB.findOne({ ChannelID: channel.id }, async(err, docs) => {
            if (err) throw err;
            if(!docs) return interaction.reply({content: `no data found, please delete manual`, ephemeral: true})
            switch (customId) {
                case "claim":
                    if (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                        if (docs.Claimed == true) return interaction.reply({content: `this ticket is already been claimed by <@${docs.ClaimedBy}>`, ephemeral: true})

                        await DB.updateOne({ChannelID: channel.id}, {Claimed: true, ClaimedBy: member.id})

                        Embed.setDescription("This ticket is Now claimed by <@" + member + ">")
                        interaction.reply({embeds: [Embed]})
                    } else {
                        interaction.reply({content: `You don't have perms. for this`, ephemeral: true})
                    }

            }
            
        })
    }
}