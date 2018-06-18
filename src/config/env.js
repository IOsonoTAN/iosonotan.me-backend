require('dotenv').config()

export default {
  nodeEnv: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 4000,
  database: {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/iosonotan',
    redisUri: process.env.REDIS_URI || 'redis://localhost:6379'
  },
  hashing: {
    algorithm: process.env.HASH_ALGORITHM || '',
    salt: {
      password: process.env.HASH_SALT_PASSWORD || false
    }
  }
}
