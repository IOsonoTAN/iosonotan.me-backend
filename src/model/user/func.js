import crypto from 'crypto'
import Chance from 'chance'

import redis from '../redis'
import User from './schema'
import config, { cacheKey } from '../../config'
import { throwError } from '../../lib/response'

const { hashing } = config
const chance = new Chance()

const md5 = (data) => {
  return crypto.createHash('md5').update(data).digest('hex')
}

const hashPassword = (username, password) => {
  if (hashing.salt.password) {
    const passwordMd5 = md5(`(${username} + ${password}) + (${hashing.salt.password} + ${hashing.algorithm})`)

    return crypto.createHmac(hashing.algorithm, hashing.salt.password).update(passwordMd5).digest('hex')
  }

  return password
}

const comparePassword = (username, password, passwordHashed) => {
  if (hashing.salt.password && hashPassword(username, password) === passwordHashed) {
    return true
  }

  return false
}

export const generateToken = (length = 64, pool = undefined) => {
  const token = chance.string({
    length,
    pool
  })

  return token
}

export const signIn = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    throwError('user not found', 'AUTH000', 401)
  } else if (!comparePassword(username, password, user.password)) {
    throwError('username or password was wrong', 'AUTH001', 401)
  }

  const uToken = await redis.getAsync(cacheKey('user.uToken', { username }))
  redis.del(cacheKey('user.token', { token: uToken }))

  const token = generateToken()

  redis.setex(cacheKey('user.token', { token }), config.cache.ttl.userToken, JSON.stringify(user))
  redis.setex(cacheKey('user.uToken', { username }), config.cache.ttl.userToken, token)

  return {
    username,
    token
  }
}

export const signUp = async (username, password, data = {}) => {
  try {
    const object = new User({
      username,
      password: hashPassword(username, password),
      ...data
    })

    return await object.save()
  } catch (err) {
    if (err.code === 11000) {
      throwError('duplicate email or username', 'AUTH100')
    }

    throw err
  }
}

export default {
  signIn,
  signUp
}
