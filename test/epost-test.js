var epost = require('../index.js')

async function main() {
  console.log('Testing epost client')

  var client = epost({ test: true })

  var result = await client.send()

  console.log(result)

  var message = await client.get(result.id)
  console.log(message)
}
main()
