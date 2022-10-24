const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giveaway")
        .setDescription("giveaway system")
        .addSubcommand(subcommand =>
            subcommand
                .setName("start")
                .setDescription("start a giveaway")
                .addStringOption(option => option.setName("duration").setDescription("provide a duration for giveaway (ex : 1m, 1h, 1d)").setRequired(true))
                .addIntegerOption(option => option.setName("winners").setDescription("select the amount of winners for this giveaway").setRequired(true))
                .addStringOption(option => option.setName("prize").setDescription("provide the name of the prize").setRequired(true))
               .addChannelOption(option => option.setName("channel").setDescription("select a channel to send the giveaway to...").addChannelTypes(ChannelType.GuildText)))
        .addSubcommand(subcommand => 
            subcommand
                .setName("actions")
                .setDescription("options for giveaways")
                .addStringOption(option =>
                    option.setName('options')
                    .setDescription('select a options')
                    .setRequired(true)
                    .addChoices(
                        { name: 'end', value: 'end' },
                        { name: 'pause', value: 'pause' },
                        { name: 'unpause', value: 'unpause' },
                        { name: "reroll", value: "reroll" },
                        { name: "delete", value: "delete" }
                ))
                .addStringOption(option => option.setName("query").setDescription("provide the message id of the giveaway").setRequired(true)))
        
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const { options } = interaction

        const Sub = options.getSubcommand()

        const errorEmbed = new EmbedBuilder()
        .setColor("Red")

        const successEmbed = new EmbedBuilder()
        .setColor("Green")

        switch (Sub) {
            case "start": {
                const gchannel = interaction.options.getChannel("channel") || interaction.channel;
                const duration = interaction.options.getString("duration")
                const winnercount = interaction.options.getInteger("winners")
                const prize = interaction.options.getString("prize")

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    prize: prize,
                    winnerCount: winnercount,
                    hostedBy: interaction.user
                })
                .then(async () => {
                    successEmbed.setDescription("Giveaway was successfully started")
                    interaction.reply({embeds: [successEmbed], ephemeral: true})
                }).catch((err) => {
                    errorEmbed.setDescription(`error: ${err}`)
                    interaction.reply({embeds: [errorEmbed], ephemeral: true})
                    console.log(err)
                });
            }
            break;

            case "actions": {
                const choice = options.getString("options")
                const query = interaction.options.getString('query');
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === query) || client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.prize === query);

                if (!giveaway) return interaction.reply({content: `Unable to find a giveaway for \`${query}\`.`, ephemeral: true});
                switch(choice) {
                    case "end": {
                        const messageId = interaction.options.getString('query');
                        client.giveawaysManager
                            .end(messageId)
                            .then(() => {
                                return interaction.reply({content: 'Success! Giveaway ended!', ephemeral: true});
                            })
                            .catch((err) => {
                                return interaction.reply({content: `An error has occurred, please check and try again.\n\`${err}\``, ephemeral: true});
                            });
                    }
                    break;

                    case "pause": {
                        const messageId = interaction.options.getString('query');
                        client.giveawaysManager
                            .pause(messageId)
                            .then(() => {
                               return interaction.reply({content: 'Success! Giveaway paused!', ephemeral: true});
                            })
                            .catch((err) => {
                                return interaction.reply({content: `An error has occurred, please check and try again.\n\`${err}\``, ephemeral: true});
                            });
                    }
                    break;

                    case "unpause": {
                        const messageId = interaction.options.getString('query');
                        client.giveawaysManager
                            .unpause(messageId)
                            .then(() => {
                                return interaction.reply({content: 'Success! Giveaway unpaused!', ephemeral: true});
                            })
                            .catch((err) => {
                                return interaction.reply({content: `An error has occurred, please check and try again.\n\`${err}\``, ephemeral: true});
                            });
                    }
                    break;

                    case "reroll": {
                        const messageId = interaction.options.getString('query');
                        client.giveawaysManager
                            .reroll(messageId)
                            .then(() => {
                                return interaction.reply({content: 'Success! Giveaway rerolled!', ephemeral: true});
                            })
                            .catch((err) => {
                                return interaction.reply({content: `An error has occurred, please check and try again.\n\`${err}\``, ephemeral: true});
                            });
                    }
                    break;

                    case "delete": {
                        const messageId = interaction.options.getString('query');
                        client.giveawaysManager
                            .delete(messageId)
                            .then(() => {
                                return interaction.reply({content: 'Success! Giveaway deleted!', ephemeral: true});
                            })
                            .catch((err) => {
                                return interaction.reply({content: `An error has occurred, please check and try again.\n\`${err}\``, ephemeral: true});
                            });
                    }
                    break;
                }
            }
            break;

            default : {
                console.log("error")
            }
        }
    },
};