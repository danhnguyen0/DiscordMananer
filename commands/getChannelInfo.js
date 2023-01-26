const { getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const { Client, SlashCommandBuilder, GatewayIntentBits} = require('discord.js');
const voice = require('./voice');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
module.exports = {
    data: new SlashCommandBuilder()
    .setName('getinfo')
    .setDescription('quitVoiceChannel!'),

    async execute(interaction) {
        //const voiceState = member.voice.channel;
        //console.log(voiceState.channel);
        //console.log(client.channel.id);

        const Guild = client.guilds; // Getting the guild.
        //const Member = Guild.members.cache.get("UserID"); // Getting the member.
        await interaction.reply(`info for channel ${interaction.channel.name}`);
    },
};