const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js')
const { connection } = require("mongoose")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Status of duckBot"),
    async execute(interaction, client) {
        const button = new ButtonBuilder() 
        .setLabel('status page !')
        .setURL('https://status.duckbot.ml')
        .setStyle(ButtonStyle.Link)


            const embed = new EmbedBuilder()
            .setTitle("Status")
            .setDescription(`**Client**: \`🟢 ONLINE\` - \`${client.ws.ping} ms\`\n **uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n\n**Database**: \`${switchTo(connection.readyState)}\``)
       

        function switchTo(val) {
            var status = " ";
            switch(val) {
                case 0: status = `🔴 DISCONNECTED`
                break;
                case 1: status = `🟢 CONNECTED`
                break;
                case 2: status = `🟠 CONNECTING`
                break;
                case 3: status = `🟣 DISCONNECTING`
                break;
            }
            return status
        }

        await interaction.reply({
            embeds: [embed],
            components: [new ActionRowBuilder().addComponents(button)]
        });


    },
};