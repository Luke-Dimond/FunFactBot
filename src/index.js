require('dotenv').config();

const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const client = new Client( { 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

client.on('clientReady', () => {
    console.log(`${client.user.username} activated—Beep Boop. All systems ready`);
});



//array of replies to the bot being pinged
const pingReplies = require('./pingReplies.json');

//an array of fun facts
const funFacts = require('./funFacts.json')


// Respond whenever the bot is pinged with a message in Discord (ignores other bots)
client.on('messageCreate', (message) => {
    if(message.mentions.has(client.user) && !message.author.bot && !message.reference){
        message.reply(pingReplies[randomArrayIndex(pingReplies)]);
    }
});

//responds to commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'fun-fact'){
       await interaction.reply(funFacts[randomArrayIndex(funFacts)]);
    }
    else if(interaction.commandName === 'who-made-me'){
       await interaction.reply(`I was created by Luke! 😎
GitHub: https://github.com/Luke-Dimond/FunFactBot
Website: https://www.dimond.studio`);
    }

});

client.login(process.env.DISCORDJS_BOT_TOKEN);

//Purpose: Picks a valid index in an array
function randomArrayIndex(arr)
{
    return Math.floor(Math.random() * arr.length);
}