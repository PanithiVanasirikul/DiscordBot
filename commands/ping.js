const {SlashCommandBuilder} = require('@discordjs/builders');
// const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	    .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	    .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	    .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	    .addUserOption(option => option.setName('target').setDescription('Select a user'))
	    .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	    .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	    .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
        // .addStringOption(option =>
        //     option.setName('input')
        //         .setDescription('The input to echo back')
        //         .setRequired(true)),
    async execute(client, interaction){
        const string = interaction.options.getString('input');
        const integer = interaction.options.getInteger('int');
        const number = interaction.options.getNumber('num');
        const boolean = interaction.options.getBoolean('choice');
        const user = interaction.options.getUser('target');
        const member = interaction.options.getMember('target');
        const channel = interaction.options.getChannel('destination');
        const role = interaction.options.getRole('muted');
        const mentionable = interaction.options.getMentionable('mentionable');
        console.log([string, integer, boolean, user, member, channel, role, mentionable]);
        await interaction.reply({content: 'Pong!', ephemeral: true});
    },
};