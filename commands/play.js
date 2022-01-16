const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const {joinVoiceChannel} = require('@discordjs/voice');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joins and Play a video from yt')
        .addStringOption(option => option.setName('link').setDescription('URL, query')),
    async execute(client, interaction){
        const channel = await client.channels.fetch(interaction.channelId);
        // console.log(channel.guild);
        
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        await interaction.reply('fuck you');
        // await console.log(user);
        // const vc = client.channels.fetch("884404283175473163");
        // if(!vc) return await interaction.reply('You need to be in a channel to execute this command.');
        // const connection = await vc.join();

        // const vidFinder = async(query) => {
        //     const vidResult = await ytSearch(query);

        //     if(vidResult.videos.length > 1) return vidResult.videos[0];
        //     return null;
        // }
    },
};