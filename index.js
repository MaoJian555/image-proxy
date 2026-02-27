import Fastify from 'fastify'
import proxyRoute from './proxy.js'

const app = Fastify({ logger: true })

app.register(proxyRoute)

app.listen({ port: 3000, host: '127.0.0.1' }, err => {
  if (err) {
    // app.log.error(err)
    process.exit(1)
  }
  console.log('🚀 Image proxy listening on 3000')
})
