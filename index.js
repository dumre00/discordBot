const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch'); // Para hacer solicitudes HTTP

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

const token = 'MTEzOTYzNDA4MzAwMjA2MDgyMA.G6WRin.xkxGVSubq8LokSZRBk1cKaqbr0nj2siZJqoFnc';
const prefix = '!'; // Prefijo de los comandos

client.once('ready', () => {
  console.log('¡El bot está en línea!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignorar mensajes de otros bots
  if (!message.content.startsWith(prefix)) return; // Ignorar mensajes sin el prefijo

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'chiste') {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
      const data = await response.json();
      const joke = `${data.setup} ${data.punchline}`;
      message.reply(joke);
    } catch (error) {
      console.error('Error al obtener el chiste:', error);
      message.reply('Lo siento, no pude conseguir un chiste en este momento.');
    }
  }
});

client.login(token);
