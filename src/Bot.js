const config = require("./config.json")
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const ms = require("ms")
const mongoose = require('mongoose');

const client = new Client({intents: 32767});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];
module.exports.Client = client


const functionFolders = fs.readdirSync("./src/functions/");
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

const SystemFolders = fs.readdirSync(`./src/Systems`);
for (const folder of SystemFolders) {
    const SystemFile = fs
        .readdirSync(`./src/Systems/${folder}`)
        .filter((file) => file.endsWith(".js"))
    for (const file of SystemFile) 
        require(`./Systems/${folder}/${file}`)(client)
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(config.Token);