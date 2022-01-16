// const ytdl = require('ytdl-core');
// const ytSearch = require('yt-search');

const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joins and Play a video from yt'),
    async execute(interaction){
        await interaction.reply('play');
    },
};