const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mod-suggest")
        .setDescription("manage the suggestion system.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addSubcommand(subcommand =>
            subcommand
            .setName("channel")
            .setDescription("Set a channel for suggestion")
            .addChannelOption(option => option.setName('channel').setDescription('Select a channel').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
            .setName("accept")
            .setDescription("accept a Suggestion")
            .addStringOption(option => option.setName('token').setDescription('suggestion token').setRequired(true))
            .addStringOption(option => option.setName('reply').setDescription('Your reply to the suggestion').setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand
                .setName("refuse")
                .setDescription("Refuse a Suggestion")
                .addStringOption(option => option.setName('token').setDescription('suggestion token').setRequired(true))
                .addStringOption(option => option.setName('reply').setDescription('Your reply to the suggestion').setRequired(true))),
    async execute(interaction, client) {
        if(interaction.options.getSubcommand() === 'channel') {
            const Schema = require('../../models/suggestion/channel')
            const channell = interaction.options.getChannel('channel')

            Schema.findOne({
                Guild: interaction.guild.id
            }, async (err, data) => {
                if(data) data.delete()
                new Schema({
                    Guild: interaction.guild.id,
                    Channel: channell.id,
                }).save()
                interaction.reply({content: `I have set ${channell} for Suggestion`})
            })
        } else if(interaction.options.getSubcommand() === 'accept') {
            const stoken = interaction.options.getString("token")
            const reply = interaction.options.getString("reply")
            const Schemag = require("../../models/suggestion/suggestion")
            Schemag.findOne({
                token: stoken,
            }, async (err, data) => {
                if(!data) return interaction.reply({content: 'Suggestion not found.'})
                const message = data.message;
                const user = client.users.cache.get(data.user);
                const guild = data.guild;
                const suggestion = data.suggestion;

                if(interaction.guild.id !== guild) return interaction.reply({content: "invalid token"})
                const channelS = require("../../models/suggestion/channel")
                const c = await channelS.findOne({
                    Guild: interaction.guild.id
                })
                const channel = c.Channel;
                const gchannel = interaction.guild.channels.cache.get(channel)
                if(!gchannel) return interaction.reply({content: "Couldn't find suggestion channel please make a new one"})
                if(channel) {
                    const embed2 = new EmbedBuilder()
                    .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
                    .setTitle("Suggestion")
                    .setDescription(`suggestion : ${suggestion}`)
                    .setColor('Green')
                    .addFields({name: "Status: Accepted", value: reply})
                    .setFooter({text: `Token: ${stoken}`})

                    gchannel.messages.fetch(message).then(editm => {
                        editm.edit({
                            embeds: [embed2]
                        })
                        interaction.reply({content:'Replied'})
                    })
                }
            })
        } else if(interaction.options.getSubcommand() === 'refuse') {
            const stoken = interaction.options.getString("token")
            const reply = interaction.options.getString("reply")
            const Schemag = require("../../models/suggestion/suggestion")
            Schemag.findOne({
                token: stoken,
            }, async (err, data) => {
                if(!data) return interaction.reply({content: 'Suggestion not found.'})
                const message = data.message;
                const user = client.users.cache.get(data.user);
                const guild = data.guild;
                const suggestion = data.suggestion;

                if(interaction.guild.id !== guild) return interaction.reply({content: "invalid token"})
                const channelS = require("../../models/suggestion/channel")
                const c = await channelS.findOne({
                    Guild: interaction.guild.id
                })
                const channel = c.Channel;
                const gchannel = interaction.guild.channels.cache.get(channel)
                if(!gchannel) return interaction.reply({content: "Couldn't find suggestion channel please make a new one"})
                if(channel) {
                    const embed2 = new EmbedBuilder()
                    .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
                    .setTitle("Suggestion")
                    .setDescription(`suggestion : ${suggestion}`)
                    .setColor("Red")
                    .addFields({name: "Status: Refused", value: reply})
                    .setFooter({text: `Token: ${stoken}`})

                    gchannel.messages.fetch(message).then(editm => {
                        editm.edit({
                            embeds: [embed2]
                        })
                        interaction.reply({content:'Replied'})
                    })
                }
            })
        }
    },
};