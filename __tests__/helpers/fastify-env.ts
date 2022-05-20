const NodeEnvironment = require('jest-environment-node')
import fastifyBuilder from '../../src/App'

class FastifyEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup()
    const fastify = await fastifyBuilder()
    this.global.fastify = fastify
  }
}

module.exports = FastifyEnvironment