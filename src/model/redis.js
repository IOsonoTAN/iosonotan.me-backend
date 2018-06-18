import redis from 'redis'
import redisDeleteWildcard from 'redis-delete-wildcard'
import bluebird from 'bluebird'
import config from '../config'

redisDeleteWildcard(redis)
bluebird.promisifyAll(redis)

const client = redis.createClient(config.database.redisUri)

client.on('connect', () => {
  console.log(`-- direct redis connected to ${config.database.redisUri}`)
})
client.on('error', (err) => {
  console.error(err)
})

export default client
