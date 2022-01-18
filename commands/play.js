const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { VoiceChannel } = require('discord.js');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joins and Play a video from yt')
        .addStringOption(option => option.setName('target').setDescription('type in a video name')),
    async execute(client, interaction){
        const channel = await interaction.member.voice.channel;
        // console.log(channel.guild);
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        // if(!vc) return await interaction.reply('You need to be in a channel to execute this command.');

        const vidFinder = async(name)=>{
            const result = await ytSearch(name);
            if(result.videos.length >= 1){
                return result.videos[0];
            }
            return null;
        }
        const vid = await vidFinder(interaction.options.getString('target'))
        if(vid){
            const url = await String(vid.url);
            const stream = await ytdl(url, {filter: 'audioonly'});
            const resource = await createAudioResource(stream, {inputType: StreamType.Arbitrary});
            const player = await createAudioPlayer();

            await player.play(resource);
            await connection.subscribe(player);
            await interaction.reply(`Playing ${vid.title}`);
            await player.on(AudioPlayerStatus.Idle, () => connection.destroy());
        }
        else{
            await interaction.reply("No video results found ")
        }
        
        // await interaction.reply(String(interaction.options.getString('link')));

        
        

    },
};