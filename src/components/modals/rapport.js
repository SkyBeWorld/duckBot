const { EmbedBuilder } = require('discord.js')
const DB = require("../../models/ticketSetup")

module.exports = {
    data: {
        name: "rapport"
    },
    async execute(interaction, client) {
        const { guild, customId, channel, member } = interaction

        const Data = await TS.findOne({GuildID: guild.id})
        if (!Data) return

        await interaction.reply({
            content: `the rapport has been sent`,
            ephemeral: true
        })

    const Embed = new EmbedBuilder()
        .setTitle('Rapport created')
        .setDescription(`a rapport has been sent`)
        .addFields(
          { name: '**__problem__**', value: `${interaction.fields.getTextInputValue('rapportt')}` },
          { name: '**__Username__**', value: `${interaction.user}` }
    )
    .setColor("#FF0000")
    const Channel = client.channels.cache.get(Data.Transcripts)
    Channel.send({ embeds: [Embed] })
    }
}