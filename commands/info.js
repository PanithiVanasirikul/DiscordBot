const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
	.setDescription('Get info about a user or a server!')
	.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addStringOption(option => option.setName('1').setDescription('The user'))),
	// .addSubcommand(subcommand =>
	// 	subcommand
	// 		.setName('server')
	// 		.setDescription('Info about the server')
    //         .addStringOption(option => option.setName('2').setDescription('The user'))),
    async execute(client, interaction){
        const string = interaction.options.getString('1')
        await interaction.reply(string);
    },
};           