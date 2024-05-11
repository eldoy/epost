# Epost

Send messages with Mailgun.

### Install

```js
npm i epost
```

### Setup

Add your default credentials to `epost.json` in your app's root folder:
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
var epost = require('epost')

// Default config
var config = {
  apikey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  from: 'test@example.com',
  sandbox: {}
}

var client = epost(config)

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
