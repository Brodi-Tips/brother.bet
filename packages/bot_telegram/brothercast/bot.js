const Api = require('telegram-bot-api')
const TG = require('telegram-bot-api')
const  stringSimilarity  =  require ( "string-similarity" ) ;

const fs = require('fs')

const api = new TG({
    token: '1922668081:AAFm8L9jONuifmn9v31rXNkLCcdKVekJS_U',
    polling: true
})


api.getMe()
.then(console.log)
.catch(console.err)
// Define your message provider
const mp = new TG.GetUpdateMessageProvider()

// Set message provider and start API
api.setMessageProvider(mp)
api.start()
.then(() => {
    console.log('API is started')
})
.catch(console.err)


api.on('update', update => {
    const chat_id = update.message.chat.id

    //api.sendMessage(update.message.chat.id,'Obrigado pela mensagem');
    // update object is defined at
    // https://core.telegram.org/bots/api#update

    if(update.message.text == '/start'){
      api.sendMessage({
        chat_id: chat_id,

        text: 'Vamos fazer uma aposta ? '
    })
    };

     //api.sendMessager(update.message.chat.id, 'jgjgh')
    //api.sendMessage(update.message.chat.id,`Olá ${update.message.chat.first_name}`)


    api.sendMessage({
        chat_id: chat_id,

        text: 'Obrigado pela mensagem',

        reply_markup: {
          inline_keyboard: [
              [
                  {
                      text: 'test1',
                      callback_data: 't1',
                  }
              ],
              [
                  {
                      text: 'test2',
                      callback_data: 't2',
                  }
              ],
              [
                  {
                      text: 'next',
                      callback_data: 'next',
                  }
              ]

          ]
      }


  })

//api.on('callback_query', query => {
//  console.log(query)
    //const chat_id = update.message.chat.id

//})

    var kkk = [
      "ASIAN HASDICAP",
      "BOTH MATCH",
      "FINAL RESULT",
      "DOUBLE HYPOTHESIS",
    ];

    var matches = stringSimilarity.findBestMatch(update.message.text,kkk.map(function (item)  {
      return item;
    }));
    console.log(update)

    //console.log(matches.bestMatch.target)
})






