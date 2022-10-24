const config = require("../../config.json");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync("./src/commands");
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));
            
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }
        const clientId = '983126524779692052';
        const guildId = '906932871103672360';
        const rest = new REST({ version: '9'}).setToken(config.Token);
        try {
            console.log("Les commandes (/) sont en train de charger.")

            await rest.put(Routes.applicationCommands(clientId, guildId), {
                body: client.commandArray,
            });

            console.log("Les commandes (/) ont été bien charger !")
        } catch (error) {
            console.error(error);
        }
    };
};