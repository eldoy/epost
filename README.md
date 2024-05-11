# Epost

Send messages with Mailgun.

### Install

```js
npm i epost
```

### Setup

Add your default credentials to `mailgun.json` in your app's root folder:
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
var client = epost()

// Send message

```