const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Replies with Play'),
    async execute(interaction){
        await interaction.reply('play');
    },
};