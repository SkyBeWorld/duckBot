module.exports = {
    data: {
        name: "linkbtn-site"
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `the website is : https://duckbot.ml/`,
            ephemeral: true
        });
    }
}