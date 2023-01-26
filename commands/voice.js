const { ChannelType } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('joinVoiceChannel!')
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('Channel to join')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
        ),
	async execute(interaction, args) {
        const voiceChannel = interaction.options.getChannel('channel');
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
	        guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        members = voiceChannel.members;
        await interaction.reply(`Joined channel ${voiceChannel.name}.`);
		
	},
};
