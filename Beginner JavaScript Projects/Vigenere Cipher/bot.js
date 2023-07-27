import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { encryptOrDecrypt } from "./converter.js";

const bot = new Telegraf(''); // place a telegram bot token here

bot.start((ctx, next) => {
  ctx.reply('hello, Send me your message');

  next();
});

let callsCount = 0; // I don't seem to find out how i can wait for each request individually instead of using this variable to track progress
const metadata = {
  message: '',
  key: '',
  mode: ''
}
bot.on(message('text'), (ctx, next) => {
  const text = ctx.message.text;
  
  if (text.startsWith('/')) return;

  callsCount++;
  if (callsCount === 1) {
    metadata.message = text;
    ctx.reply('Now send me a key')
  }
  if (callsCount === 2) {
    metadata.key = text;
    ctx.reply(`Now choose a mode between 'encrypt' or 'decrypt'`)
  }  
  if (callsCount === 3) {
    metadata.mode = text;
    ctx.reply(encryptOrDecrypt(metadata.message, metadata.key, metadata.mode));
    callsCount = 0;
  }
});


bot.launch();