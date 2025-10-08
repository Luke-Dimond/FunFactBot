require('dotenv').config();

const { Client, GatewayIntentBits, InteractionCallback } = require('discord.js');
const client = new Client( { 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

client.on('clientReady', () => {
    console.log(`${client.user.username} activated—Beep Boop. All systems ready 🍺💻😮‍💨💨`);
});



//array of replies to the bot being pinged
const pingReplies = require('./pingReplies.json');

//an array of facts
const facts = require('./facts.json');


// Respond whenever the bot is pinged with a message in Discord (ignores other bots)
client.on('messageCreate', (message) => {
    if(message.mentions.has(client.user) && !message.author.bot){
        message.reply(pingReplies[randomArrayIndex(pingReplies)]);
    }
});

//responds to the `/yerb-fact` command
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'yerb-fact'){
        interaction.reply(facts[randomArrayIndex(facts)]);
    }
    else if(interaction.commandName === 'who-made-me'){
        interaction.reply(`I was masterfully created by Luke! 😎
GitHub: https://github.com/Luke-Dimond/YerbBot
Website: https://www.dimond.studio`);
    }

});

client.login(process.env.DISCORDJS_BOT_TOKEN);

//Purpose: Picks a valid index in an array
function randomArrayIndex(arr)
{
    return Math.floor(Math.random() * arr.length);
}