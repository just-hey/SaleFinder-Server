const Cart = require('./models/carts.model')
const Products = require('./models/products.model')
const currentWeekNumber = require('current-week-number')
const accountSid = `${process.env.TWILIO_SID}`
const authToken = `${process.env.TWILIO_TOKEN}`
const { promisify } = require('util')
const client = require('twilio')(accountSid, authToken)
const pCreate = promisify(client.messages.create).bind(client.messages)
require('dotenv').config()
// require the Twilio module and create a REST client


function forSMS() {
  let exists = []
  let week = currentWeekNumber()
  return Cart.findForSMS(week-1)
    .then(list => {
      let promiseArr = checkListForMatch(list)
      return Promise.all(promiseArr)
    })
    .then(matches => {
      matches.map(match => {
        if (match.length > 0) {
          exists.push(match[0])
        }
      })
      return exists
    })
    .then(textsToBe => {

      let smsPromises = textsToBe.map(txtToBe => {
        return SMSMaker(txtToBe)
    })
    return Promise.all(smsPromises)
    })
    .then(() => process.exit(0))
    .catch(err => {
      console.log(err)
      process.exit(0)
    }

}

function checkListForMatch(list) {
  return list.map((item) => {
    return Products.checkForSMSMatch(item.productString, item.zip, item.phone, item.first_name)
  })
}

function SMSMaker(txtToBe) {
  return pCreate({
    to: `+1${txtToBe.phone}`,
    from: '+15014825260',
    body: `SaleFinder: ${txtToBe.name} is ${txtToBe.price} at ${txtToBe.store}`,
  })
  .then(message => console.log(message.sid))
  .catch(console.error)
}

forSMS()
