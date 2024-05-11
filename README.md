# Wrigger

Send messages with the Mailgun API.

### Install

```js
npm i wriggler
```

### Setup

Add your default credentials to `mail.json` in your app's root folder:
```js
{
  "apikey": "",
  "domain": "",
  "from": "",
  "sandbox": {
    "domain": "",
    "from": ""
  }
}
```

### Usage

```js
var wriggler = require('wriggler')

// Default config
var config = {
  apikey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  from: 'test@example.com',
  sandbox: {}
}

var client = wriggler(config)

// Send message
var result = await client.send({
  from: 'Excited User <test@example.com>',
  to: ['vidar@eldoy.com'],
  subject: 'Hello',
  text: 'Testing mailer',
  html: '<h1>Testing mailer</h1>'
})

// Get message events
var events = await client.get(result.id)
```
