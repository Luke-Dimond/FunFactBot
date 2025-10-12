require('dotenv').config();
const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: 'fun-fact',
        description: 'Replies with a fun fact about computer programming, beer, or philosophy'
    },
    {
        name: 'who-made-me',
        description: `Tells the server who made the FunFactBot.`
    }

];

const rest = new REST({version: '10'}).setToken(process.env.DISCORDJS_BOT_TOKEN);


(async () => {
    try{
        console.log(`Registering slash commands...`);
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID),
            {body: commands}
        )
        console.log(`Slash commands registered successfully.`);
    } catch(error){
        console.error(`There was an error: `, error);
    }
})();