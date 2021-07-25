const Api = require('telegram-bot-api')
const TG = require('telegram-bot-api')

const fs = require('fs')

const api = new TG({
    token: '1922668081:AAFm8L9jONuifmn9v31rXNkLCcdKVekJS_U'
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

// Receive messages via event callback
api.on('update', update => {
    const chat_id = update.message.chat.id

    //api.sendMessage(update.message.chat.id,'Obrigado pela mensagem');
    // update object is defined at
    // https://core.telegram.org/bots/api#update

     //api.sendMessager(update.message.chat.id, 'jgjgh')
    //api.sendMessage(update.message.chat.id,`Olá ${update.message.chat.first_name}`)
    api.sendMessage({
        chat_id: chat_id,

        text: 'Obrigado pela mensagem'
    })

    console.log(update.message.chat.id)
})



