const {VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('quit')
    .setDescription('quitVoiceChannel!'),

    async execute(interaction, args) {
        const connection = getVoiceConnection(interaction.guild.id);
        connection.destroy();
        await interaction.reply(`Leaved channel ${connection.id}.`);
    },
};