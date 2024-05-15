var epost = require('../index.js')
var assert = require('assert')

async function main() {
  console.info('Testing epost client')

  var client = epost({ test: true })

  console.info('√ it should error')
  var result = await client.send()

  assert.ok(result.status == 400)
  assert.ok(result.message == 'Bad Request')
  assert.ok(result.details == 'to parameter is missing')
  assert.ok(result.type == 'MailgunAPIError')

  console.info('√ it should send')

  result = await client.send({ to: 'vidar@eldoy.com' })
  assert.ok(result.status == 200)
  assert.ok(!!result.id)
  assert.ok(result.message == 'Queued. Thank you.')

  console.info('√ it should get message data')

  result = await client.get(result.id)
  assert.ok(!!result.items)
}
main()
