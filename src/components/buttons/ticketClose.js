const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, ChannelType, PermissionsBitField , PermissionFlagsBits} = require("discord.js")
const DB = require("../../models/ticket")
const { createTranscript } = require("discord-html-transcripts")
const TS = require("../../models/ticketSetup")

module.exports = {
    data: {
        name: "close"
    },
    async execute(interaction, client) {
        const { guild, customId, channel, member } = interaction

        const Embed = new EmbedBuilder().setColor("Blue")

        const Data = await TS.findOne({GuildID: guild.id})
        if(!Data) return 

        DB.findOne({ ChannelID: channel.id }, async(err, docs) => {
            if (err) throw err;
            if(!docs) return interaction.reply({content: `no data found, please delete manual`, ephemeral: true})
            switch (customId) {
                case "close":
                    if (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                        if (docs.Closed == true) return interaction.reply({content: `this ticket is already closed`, ephemeral: true})
                        const attachment = await createTranscript(channel, {
                            limit: -1,
                            returnBuffer: false,
                            fileName: `${docs.Type} - ${docs.TicketID}.html`
                        })
                        await DB.updateOne({ ChannelID: channel.id }, {Closed: true})
                        
                        const Message = await guild.channels.cache.get(Data.Transcripts).send({embeds: [Embed.setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`)], files: [attachment]})
    
                        interaction.reply({embeds: [Embed.setDescription(`transcript is now saved [TRANSCRIPT](${Message.url})`)]})
    
                        setTimeout(() => {
                            channel.delete();
                        }, 10 * 1000)
                    } else {
                        interaction.reply({content: `You don't have perms. for this`, ephemeral: true})
                    }

            }
            
        })
    }
}