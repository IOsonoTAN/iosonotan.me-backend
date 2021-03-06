import redis from '../model/redis'
import { responseError, throwError } from '../lib/response'
import config, { cacheKey } from '../config'

export default async (req, res, next) => {
  try {
    const token = req.headers['access-token']
    if (!token) {
      throwError('unauthorized', '1010', 401)
    }

    const tokenCacheKey = cacheKey('user.token', { token })
    const isUser = await redis.getAsync(tokenCacheKey)
    if (!isUser) {
      throwError('unauthorized', '1011', 401)
    }
    req.auth = {
      user: JSON.parse(isUser)
    }

    redis.expire(tokenCacheKey, config.cache.ttl.userToken)

    next()
  } catch (err) {
    responseError(res, err, err.status)
  }
}
