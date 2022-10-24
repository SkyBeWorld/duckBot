const { Client, Message, EmbedBuilder } = require("discord.js")
const lvlDB = require("../../models/level")
const ChannelDB = require("../../models/LevelUp")

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        const { author, guild } = message
        if(!guild || author.bot) return
        lvlDB.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {
            if (err) throw err
            if(!data) {
                lvlDB.create({
                    Guild: guild.id,
                    User: author.id,
                    XP:0,
                    Level: 0
                })
            }
        })
        const ChannelData = await ChannelDB.findOne({Guild: guild.id}).catch(err => {  })

        const give = Math.floor(Math.random() * 29) + 1

        const data = await lvlDB.findOne({Guild: guild.id, User: author.id}).catch(err => {  })
        if(!data) return

        const requiredXP = data.Level * data.Level * 100 + 100

        if(data.XP + give >= requiredXP) {
            data.XP += give
            data.Level += 1
            await data.save()

            const embed = new EmbedBuilder()
            .setTitle(`new level`)
            .setColor("Green")
            .setDescription(`Congratulations, You've reached ${data.Level} level`)
            .setTimestamp(Date.now())

            if(ChannelData) {
                const Channel = guild.channels.cache.get(ChannelData.Channel)

                if(!Channel) return message.channel.send({embeds: [embed]})

                Channel.send({
                    embeds: [embed]
                })
            }
        } else {
            data.XP += give
            await data.save()
        }
    }
}