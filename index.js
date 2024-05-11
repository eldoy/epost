var formData = require('form-data')
var Mailgun = require('mailgun.js')
var mailgun = new Mailgun(formData)

module.exports = function (config = {}) {
  var defaultConfig = {}
  try {
    defaultConfig = require('./mail.json')
  } catch (e) {}

  config = { ...defaultConfig, ...config }

  var {
    apikey = process.env.MAILGUN_API_KEY,
    domain = process.env.MAILGUN_DOMAIN,
    from = 'test@example.com',
    sandbox = {}
  } = config

  if (config.test) {
    var { domain, from } = sandbox
  }

  var mg = mailgun.client({ username: 'api', key: apikey })

  async function send(options = {}) {
    // TODO: auto-translate text to HTML if html is missing
    options = { from, subject: 'No subject', ...options }

    if (config.test) {
      options = {
        to: 'vidar@eldoy.com',
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

    var message = await mg.messages.create(domain, options)

    return message
  }

  async function get(messageId) {
    var message = mg.events.get(domain, { 'message-id': messageId })

    return message
  }

  return { send, get }
}
