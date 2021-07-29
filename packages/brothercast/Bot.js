TelegramBot = require('node-telegram-bot-api');
//const requestify = require('requestify');

const token = '1922668081:AAFm8L9jONuifmn9v31rXNkLCcdKVekJS_U'; //process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {
    polling: true
});

const units = [[
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
  }]];

const bet_type = [

  [{
      text: ' Asian Handicap ',
      callback_data: JSON.stringify({
         command: 'Asian',

      })
  }],
  [{
      text: ' Both mach ',
      callback_data: JSON.stringify({
         command: 'Both',

      })
  }],
  [{
      text: ' Final Result ',
      callback_data: JSON.stringify({
         command: 'Final',

      })
  }],
  [{
      text: ' Double Hypothesis ',
      callback_data: JSON.stringify({
        command: 'Double',

      })
  }]

  ]

const games = [

  [{
      text: ' A.Madrid (CarlWhizzer) vs Barcelona (Void) ',
      callback_data: JSON.stringify({
        command: 'bet_type',

      })
  }],
  [{
      text: 'Valencia (WeeMan) vs Sevilla (ViTo)',
      callback_data: JSON.stringify({
        command: 'bet_type',

      })
  }]

  ]

const both_etapa = [

  [{
      text: ' Yes ',
      callback_data: JSON.stringify({
         command: 'Both_opt',

      })
  }],
  [{
      text: ' No ',
      callback_data: JSON.stringify({
         command: 'Both_opt',

      })
  }]


  ]

const opts_gerais = [
  ['bet_type','Escolha o tipo da aposta', bet_type],
  ['Asian','Escolha a unidade', units],
  ['Both','etapa',both_etapa],
  ['Both_opt','Escolha a unidade',units]
]




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

    if (data.command === 'fifa') {

        const opts_bet = {
           reply_to_message_id: msg.message_id,
           reply_markup: JSON.stringify({
             inline_keyboard: games
           })
        };

        if(msg.chat.type=="private"){

           bot.sendMessage(msg.chat.id, `Escolha um dos jogos: `, opts_bet);
           bot.answerCallbackQuery(callbackQuery.id);
        }

    }

    for (var i = 0; i < opts_gerais.length; i++) {


      if (data.command === opts_gerais[i][0]) {
        bot.sendMessage(opts.chat_id, `${opts_gerais[i][1]}`,{
          //reply_to_message_id: msg.message_id,
          reply_markup: {
              inline_keyboard: opts_gerais[i][2],
          }
        });
        bot.answerCallbackQuery(callbackQuery.id);

      }

    }


});

//bot.on('message', console.log);






