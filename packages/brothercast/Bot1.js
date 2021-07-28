TelegramBot = require('node-telegram-bot-api');
//const requestify = require('requestify');

const token = '1922668081:AAFm8L9jONuifmn9v31rXNkLCcdKVekJS_U'; //process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {
    polling: true
});

const units = [
  {
      text: '0.25',
      callback_data: JSON.stringify({
          command: 'confirmar',
      })
  },
  {
      text: ' 0.5 ',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  },
  {
      text: ' 1.0 ',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  },
  {
      text: ' 2.0',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  },
  {
      text: ' 3.0',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  },
  {
      text: ' 4.0',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  }];




bot.onText(/\/start/, (msg, match) => {
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
    if(msg.chat.type=="private")
        namee = msg.chat.first_name
        bot.sendMessage(msg.chat.id, `Olá ${namee} seja bem vindo a Brother`, opts);

});



bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const data = JSON.parse(callbackQuery.data);
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
    };
    let text;
    if (data.command === 'fifa') {

      const opts_bet = {
          reply_to_message_id: msg.message_id,
          reply_markup: JSON.stringify({
            inline_keyboard: [[{
              text: ' A.Madrid (CarlWhizzer) vs Barcelona (Void) ',
              callback_data: JSON.stringify({
                   command: 'price',

          }) }],
          [{
            text: 'Valencia (WeeMan) vs Sevilla (ViTo)',
            callback_data: JSON.stringify({
                 command: 'price',

        }) }]]
        })
    };
    if(msg.chat.type=="private")

        bot.sendMessage(msg.chat.id, `Escolha um dos jogos: `, opts_bet);
        bot.answerCallbackQuery(callbackQuery.id);

    }else{
      if (data.command === 'price') {
        bot.sendMessage(opts.chat_id, `Escolha o tipo da aposta`,{
          reply_markup: {
              inline_keyboard: [[{
                text: ' Asian Handicap ',
                callback_data: JSON.stringify({
                     command: 'Asian',
                     'base': 'BTC'
                }) }],[{
                text: ' Both mach ',
                callback_data: JSON.stringify({
                     command: 'Both',
                     'base': 'BTC'
                }) }],[{
                text: ' Final Result ',
                callback_data: JSON.stringify({
                    command: 'Final',
                    'base': 'BTC'
                }) }],[{
                text: ' Double Hypothesis ',
                callback_data: JSON.stringify({
                    command: 'Double',
                    'base': 'BTC'
        }) }]],
          }
        });
        bot.answerCallbackQuery(callbackQuery.id);

      }else{
        if (data.command === 'Asian') {
          bot.sendMessage(opts.chat_id, `Escolha a unidade`,{
            reply_markup: {
                inline_keyboard: [units]
            }
          });
          bot.answerCallbackQuery(callbackQuery.id);

        }

      }

    }

});

bot.on('message', console.log);

const indices = [];
const y = ['a','b','c','d','e','f','g','h','i'];

for (var i = 0; i < 20; i++) {

  const newobject = [{
    text: ' teste ',
    callback_data: JSON.stringify({
         command: 'price',
         'base': 'BTC'
}) }];

  indices.push(newobject)

};

bot.onText(/Both mach/i, (msg, match) => {
  const opts = {
      reply_markup: {
          inline_keyboard: indices
      }
  };
  bot.sendMessage(msg.chat.id, 'Jogos disponiveis', opts);
});




