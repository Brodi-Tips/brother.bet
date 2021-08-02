import TelegramBot from 'node-telegram-bot-api';
//import Env from '@ioc:Adonis/Core/Env'

import  {opts_gerais,games} from './BotEntities'
//import games from './BotEntities'

export default class Bot {
  token: string;
  bot: any;

  constructor() {
    this.token = '1922668081:AAFm8L9jONuifmn9v31rXNkLCcdKVekJS_U';//Env.get('TELEGRAM_TOKEN');
    this.bot = new TelegramBot(this.token, {
      polling: true
    });

    this.main()
  }

  main() {
    this.bot.onText(/\/start/, (msg) => {
      console.log(msg);
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{
              text: 'Fifa Live Arena 10',
              callback_data: JSON.stringify({
                command: 'fifa',

              })
            },
            ]
          ]
        })

      };

      if (msg.chat.type == "private") {
        const name = msg.chat.first_name
        this.bot.sendMessage(msg.chat.id, `Olá ${name} seja bem vindo a Brother`, opts);
      }

    });

    this.bot.on('callback_query', (callbackQuery) => {
      const data = JSON.parse(callbackQuery.data);
      const msg = callbackQuery.message;
      const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
      };

      if (data.command === 'fifa') {
        const opts_bet = {
          reply_to_message_id: msg.message_id,
          reply_markup: JSON.stringify({
            inline_keyboard: games
          })
        };

        if (msg.chat.type == "private") {
          this.bot.sendMessage(msg.chat.id, `Escolha um dos jogos: `, opts_bet);
          this.bot.answerCallbackQuery(callbackQuery.id);
        }

      }

      for (var i = 0; i < opts_gerais.length; i++) {
        if (data.command === opts_gerais[i][0]) {
          this.bot.sendMessage(opts.chat_id, `${opts_gerais[i][1]}`, {
            //reply_to_message_id: msg.message_id,
            reply_markup: {
              inline_keyboard: opts_gerais[i][2],
            }
          });
          this.bot.answerCallbackQuery(callbackQuery.id);
        }
      }
    });
  }
}







