const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const { token } = require('./config.json');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
var botChannelId = null;
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
	client.user.setUsername('Manager');
});



client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	const command = client.commands.get(interaction.commandName);
	//console.log(client);
	if (!command) return;
	try {
		const guilds = client.guilds.cache.map(guild => guild.id);	
		const botUser = client.user;
		const channel = interaction.guild.members.cache.get(botUser.id).voice.channel;
		if(channel)
			botChannelId = channel.id;
		else
			botChannelId = null;
		await command.execute(interaction);
		
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.on('voiceStateUpdate', (oldState, newState) => {

	if(oldState.id !== client.user.id) {
		/*if(newState.channelId === null) //left
			console.log('user left channel', oldState.channelId);
		else if(oldState.channelId === null) // joined
			console.log('user joined channel', newState.channelId);
		else // moved
			console.log('user moved channels', oldState.channelId, newState.channelId);
			*/
		if (newState.channelId === botChannelId) {
			console.log("User", newState.member.user.username, "has joined");		
		}
	}
});

client.on(Events.ClientReady, () => {
	console.log('TEST');
});


client.login(token);
