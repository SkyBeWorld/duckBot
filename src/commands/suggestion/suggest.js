const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("send a suggestion")
        .addStringOption(option => option.setName('query').setDescription('Your suggestion').setRequired(true)),
    async execute(interaction, client) {
            const suggestion = interaction.options.getString('query')
            const CSchema = require("../../models/suggestion/suggestion")
            const SSchema = require("../../models/suggestion/channel")
            SSchema.findOne({
                Guild: interaction.guild.id
            }, async (err, data) => {
                const pass = gen()
                const channel = interaction.guild.channels.cache.get(data.Channel)
                if(!data) return interaction.reply({content: 'Suggestion channel not set...'})
                if(data) {
                    const embed = new EmbedBuilder()
                        .setTitle('Suggestion')
                        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
                        .setDescription(`Suggestion: ${suggestion}`)
                        .setColor('Blue')
                        .addFields({name: "Status: Waiting", value: "⏳"})
                        .setFooter({text: `Token: ${pass}`})

                        channel.send({
                            embeds: [embed]
                        }).then(m => {
                            interaction.reply({content: 'suggestion sent'})
                            m.react("👍")
                            m.react("👎")
                            new CSchema({
                                message: m.id,
                                token: pass,
                                suggestion: suggestion,
                                user: interaction.user.id,
                                guild: interaction.guild.id
                            }).save()
                        })
                }
            })
        
    },
};

function gen() {
    var length = 22,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
    for(var i = 0, n =charset.length; i < length; i++) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}