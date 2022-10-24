const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType } = require('discord.js')
const DB = require("../../models/ticketSetup")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-setup")
        .setDescription("setup ticket")
        .addChannelOption(option =>
            option
            .setName("channel")
            .setDescription("Select a channel for ticket create panel")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText))
        .addChannelOption(option =>
            option
            .setName("category")
            .setDescription("Select Category for ticket creation")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildCategory))
        .addChannelOption(option =>
            option
            .setName("transcripts")
            .setDescription("Select the transcripts channels")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText))
        .addRoleOption(option =>
            option
            .setName("handlers")
            .setDescription("Select the ticket handler's role.")
            .setRequired(true))
        .addRoleOption(option =>
            option
            .setName("everyone")
            .setDescription("Provide the @everyone role, its important")
            .setRequired(true))
        .addStringOption(option =>
            option
            .setName("description")
            .setDescription("set the description")
            .setRequired(true))
        .addStringOption(option =>
            option
            .setName("button")
            .setDescription("give button name")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const { guild, options } = interaction

        try {
            const Channel = options.getChannel("channel")
            const Category = options.getChannel("category")
            const Transcripts = options.getChannel("transcripts")
            const Handlers = options.getRole("handlers")
            const Everyone = options.getRole("everyone")

            const Description = options.getString("description")

            const Buttons1 = options.getString("button")

            await DB.findOneAndUpdate({ GuildID: guild.id }, {
                Channel: Channel.id,
                Category: Category.id,
                Transcripts: Transcripts.id,
                Handlers: Handlers.id,
                Everyone: Everyone.id,
                Description: Description.id,
                Buttons: [Buttons1]
            },
            {
                new: true,
                upsert: true,
            })

            const Embed = new EmbedBuilder()
            .setAuthor({
                name: `${guild.name} | Ticket System`,
                iconURL: `${guild.iconURL({dynamic: true})}`
            })
            .setDescription(Description)
            .setColor("Green")
    
            const Buttons = new ActionRowBuilder()
            Buttons.addComponents(
                new ButtonBuilder()
                .setCustomId("ticket")
                .setLabel(Buttons1)
                .setStyle(ButtonStyle.Primary)
                .setEmoji("🎫")
            )
    
            await guild.channels.cache.get(Channel.id).send({embeds: [Embed], components: [Buttons]})
    
            interaction.reply({content: `success`, ephemeral: true})    
        } catch (error) {
            console.log(error)
        }
    },
};