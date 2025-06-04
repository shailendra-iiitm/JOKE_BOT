import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
// Here we have made an env variable using cmd and setx instruction  and stored 
// the EXACT value of JOKE API KEY SO THAT IT DOESNT GET EXPOSED TO THE PUBLIC.

const bot = new TelegramBot(process.env.JOKE_API_TOKEN, {polling: true}); 
bot.on('message', (option) => {
    console.log("Message received by bot", option);
    bot.sendMessage(option.chat.id, "Hello! I am a Joke Bot.Please type /joke to get a joke.");
});

bot.onText(/\/joke/, async (option) => {
    // Add your joke fetching logic here using axios
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
        const joke = response.data;
        const jokeMessage = `${joke.setup}\n\n${joke.punchline}`;
        bot.sendMessage(option.chat.id, jokeMessage);



    } catch (error) {
        bot.sendMessage(option.chat.id, "Sorry, couldn't fetch a joke!");
    }




});