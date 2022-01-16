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
        .addStringOption(option => option.setName('link').setDescription('URL, query')),
    async execute(client, interaction){
        const channel = await interaction.member.voice.channel;
        // console.log(channel.guild);
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        // if(!vc) return await interaction.reply('You need to be in a channel to execute this command.');
        console.log(interaction.options.getString('link'));
        const stream = ytdl(interaction.options.getString('link'), {filter: 'audioonly'});
        const resource = createAudioResource(stream, {inputType: StreamType.Arbitrary});
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => connection.destroy());

    },
};