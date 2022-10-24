const { ActivityType } = require('discord.js')
const mongoose = require('mongoose')
const config = require(`../../config.json`)
const Schema = require('../../models/member-count')
const mongoURL = config.databasetoken

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is online!`);

        setInterval(() => {
            Schema.find().then((data) => {
                if(!data && !data.length) return

                data.forEach((value) => {
                    const guild = client.guilds.cache.get(value.Guild)
                    const memberCount = guild.memberCount
                    if(value.Member != memberCount) {
                        console.log("The memberCount differs")
                        const channel = guild.channels.cache.get(value.Channel)
                        channel.setName(`Members: ${memberCount}`)

                        value.Member = memberCount
                        value.save()
                    }
                })
            })

        const activities = [
            `With ${client.guilds.cache.size} servers`,
            `With ${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)} users`,
            `/help | SlashCommand`,
            `Invite me now !`
        ]


            const status = activities[Math.floor(Math.random()*activities.length)]
            client.user.setPresence({activities: [{name: `${status}`, type: ActivityType.Playing}]});
        }, 5000);
        

        if(!mongoURL) return
        mongoose.connect(mongoURL, {
              useNewUrlParser: true,
           useUnifiedTopology: true,
        }).then(() => {
            console.log("database connection established")
        }).catch(err => console.log(err))
    }
}