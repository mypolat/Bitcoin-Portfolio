const TeleBot = require('telebot')
const bot = new TeleBot('TELEGRAM_BOT_API_TOKEN')

const request = require('request')

const url_koinim = 'https://koinim.com/ticker/'
const url_paribu = 'https://www.paribu.com/ticker'
const url_btcturk = 'https://www.btcturk.com/api/ticker'

bot.on(['/start'], (msg) => msg.reply.text('Welcome!\nYou can use these:\n/koinim <coin>\n/paribu <coin>\n/btcturk <coin>\n\nGood luck!'))

bot.on(/^\/koinim (.+)$/, (msg, props) => {
    var myCoin = props.match[1]

    request(url_koinim, (error, response, body)=> {
        if (!error && response.statusCode === 200) {
          const ticker = JSON.parse(body)
          var result = parseFloat(ticker.sell)*parseFloat(myCoin)
          const text="You have "+(result.toFixed(2)+" tl")

          return bot.sendMessage(msg.from.id, text);
        } else {
          console.log("Error: ", error, ", status code: ", response.statusCode)
        }
      })
})

bot.on(/^\/paribu (.+)$/, (msg, props) => {
    var myCoin = props.match[1]

    request(url_paribu, (error, response, body)=> {
        if (!error && response.statusCode === 200) {
          const ticker = JSON.parse(body)
          var result = parseFloat(ticker.BTC_TL.last)*parseFloat(myCoin)
          const text="You have "+(result.toFixed(2)+" tl")

          return bot.sendMessage(msg.from.id, text);
        } else {
          console.log("Error: ", error, ", status code: ", response.statusCode)
        }
      })
})

bot.on(/^\/btcturk (.+)$/, (msg, props) => {
    var myCoin = props.match[1]

    request(url_btcturk, (error, response, body)=> {
        if (!error && response.statusCode === 200) {
          const ticker = JSON.parse(body)
          var result = parseFloat(ticker[0].last)*parseFloat(myCoin)
          const text="You have "+(result.toFixed(2)+" tl")

          return bot.sendMessage(msg.from.id, text);
        } else {
          console.log("Error: ", error, ", status code: ", response.statusCode)
        }
      })
})

bot.start()