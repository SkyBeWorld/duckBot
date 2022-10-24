const { EmbedBuilder } = require("discord.js")
const client = require("../../Bot")
const Schema = require("../../models/welcome")

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(member, client) {
        Schema.findOne({Guild: member.guild.id}, async(err, data) => {
            if(!data) return
            let channel = client.channels.cache.get(data.Channel)
            let Msg = data.Msg || " "
            let title = data.Title
            let embed = new EmbedBuilder()
            .setTitle(`${member.user.tag} joined`)
            .setDescription(`${Msg}` || "Welcome to the Guild :)")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({
                text: `we are now ${member.guild.memberCount} members`
            })

           await channel.send({content: `<@${member.id}>`, embeds: [embed]})
        })
    }
}