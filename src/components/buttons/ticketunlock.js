const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, ChannelType, PermissionsBitField, PermissionFlagsBits } = require("discord.js")
const DB = require("../../models/ticket")
const { createTranscript } = require("discord-html-transcripts")
const { transcriptsID } = require("../../config.json")

module.exports = {
    data: {
        name: "unlock"
    },
    async execute(interaction, client) {
        const { guild, customId, channel, member } = interaction

        const Embed = new EmbedBuilder().setColor("Blue")

        DB.findOne({ ChannelID: channel.id }, async(err, docs) => {
            if (err) throw err;
            if(!docs) return interaction.reply({content: `no data found, please delete manual`, ephemeral: true})
            switch (customId) {
                case "unlock":
                    if (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                        if (docs.Locked == false) return interaction.reply({content: `this ticket is already unlocked`, ephemeral: true})

                        await DB.updateOne({ ChannelID: channel.id }, { Locked: false })
                        Embed.setDescription("🔓 | unlocked with success")
                        docs.MembersID.forEach((m) => {
                            channel.permissionOverwrites.edit(m, {
                                SendMessages: true
                            })
                        })
            
                        interaction.reply({embeds: [Embed]})
                    } else {
                        interaction.reply({content: `you don't have perms.`, ephemeral: true})
                    }

                    break;
            }
            
        })
    }
}