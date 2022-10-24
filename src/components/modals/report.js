const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: "report"
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `bug report has benn sent`
        })

    const Embed = new EmbedBuilder()
        .setTitle('Bug report')
        .setDescription(`a bug report has been sent`)
        .addFields(
          { name: '**__problem__**', value: `${interaction.fields.getTextInputValue('problem')}` },
          { name: '**__Username__**', value: `${interaction.user}` }
    )
    .setColor("#FF0000")
    const channel = client.channels.cache.get('1002871461154918430')
    channel.send({ embeds: [Embed] })
    }
}