const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../../models/ticket');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Ticket action")
        .addStringOption(option => option.setName('action').setDescription("Add or remove memeber from this tickets")
        .addChoices(
            { name: "Add", value: "add" },
            { name: "Remove", value: "remove" },
        ).setRequired(true))
        .addUserOption(option => option.setName("member").setDescription("select a member").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const { guildId, options, channel } = interaction

        const Action = options.getString("action")
        const Member = options.getMember("member")

        const Embed = new EmbedBuilder()

        switch(Action) {
            case "add":
                db.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
                    if (err) throw err
                    if(!docs) return interaction.reply({embeds: [Embed.setDescription("This channel is not tied with a ticket")], ephemeral: true})

                    if (docs.MembersID.includes(Member.id)) return interaction.reply({embeds: [Embed.setDescription("This member is already added to this ticket.")], ephemeral: true})
                    docs.MembersID.push(Member.id)

                    channel.permissionOverwrites.edit(Member.id, {
                        ViewChannel: true,
                        SendMessages: true,
                        ReadMessageHistory: true
                    })

                    interaction.reply({embeds: [Embed.setDescription(`${Member} has been added to this ticket`)]})

                    docs.save()
                })
                break;
            case "remove":
                db.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
                    if (err) throw err
                    if(!docs) return interaction.reply({embeds: [Embed.setDescription("This channel is not tied with a ticket")], ephemeral: true})

                    if (!docs.MembersID.includes(Member.id)) return interaction.reply({embeds: [Embed.setDescription("This member is not in this ticket")], ephemeral: true})
                    docs.MembersID.remove(Member.id)

                    channel.permissionOverwrites.edit(Member.id, {
                        ViewChannel: false,
                        SendMessages: false,
                        ReadMessageHistory: false
                    })

                    interaction.reply({embeds: [Embed.setDescription(`${Member} has been removed to this ticket`)]})

                    docs.save()
                })
                break;
        }
    },
};