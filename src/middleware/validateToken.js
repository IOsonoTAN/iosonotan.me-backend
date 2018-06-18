import redis from '../model/redis'
import { responseError, throwError } from '../lib/response'
import { cacheKey } from '../config'

export default async (req, res, next) => {
  try {
    const token = req.headers['access-token']
    if (!token) {
      throwError('unauthorized', '1010')
    }

    const tokenCacheKey = cacheKey('user.token', { token })
    const isUser = await redis.getAsync(tokenCacheKey)
    if (!isUser) {
      throwError('unauthorized', '1011')
    }

    // extend ttl up to 1 hour.
    redis.expire(tokenCacheKey, 3600)

    next()
  } catch (err) {
    responseError(res, err)
  }
}
