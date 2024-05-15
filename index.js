var Mailgun = require('mailgun.js')
var formData = require('form-data')
var mailgun = new Mailgun(formData)

var regions = {
  us: 'https://api.mailgun.net',
  eu: 'https://api.eu.mailgun.net'
}

module.exports = function (config = {}) {
  var CONFIG = {}
  try {
    CONFIG = require('./mail.json')
  } catch (e) {}

  config = { ...CONFIG, ...config }

  var {
    apikey = process.env.MAILGUN_API_KEY,
    domain = process.env.MAILGUN_DOMAIN,
    from = 'test@example.com',
    region = 'us',
    sandbox = {}
  } = config

  if (config.test) {
    var { apikey, domain, from, region } = sandbox
  }

  var mg = mailgun.client({
    username: 'api',
    key: apikey,
    url: regions[region]
  })

  async function send(options = {}) {
    options = { from, subject: 'No subject', ...options }

    if (config.test) {
      options = {
        subject: 'Hello',
        text: 'Testing mailer',
        html: '<h1>Testing mailer!</h1>',
        ...options
      }
    }

    // Options example:
    // {
    //   from: 'Excited User <test@example.com>',
    //   to: ['vidar@eldoy.com'],
    //   subject: 'Hello',
    //   text: 'Testing mailer',
    //   html: '<h1>Testing mailer</h1>'
    // }

    var message
    try {
      message = await mg.messages.create(domain, options)
    } catch (e) {
      console.error(e)
      message = e
    }

    return message
  }

  async function get(messageId) {
    var message = mg.events.get(domain, { 'message-id': messageId })

    return message
  }

  return { send, get }
}
