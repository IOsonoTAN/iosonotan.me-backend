import User from '../model/user'
import { responseError } from '../lib/response'
import redisClient from '../model/redis'
import { cacheKey } from '../config'

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body

    const isUser = await User.signIn(username, password)

    res.send(isUser)
  } catch (err) {
    responseError(res, err, err.status)
  }
}

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body
    let isExpired = false

    const remainTTL = await redisClient.ttlAsync(cacheKey('user.token', { token }))
    if (remainTTL <= 0) {
      isExpired = true
    }

    res.send({
      token,
      isExpired,
      remainTTL
    })
  } catch (err) {
    responseError(res, err, err.status)
  }
}

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body

    const newUser = await User.signUp(username, password)

    res.send(newUser)
  } catch (err) {
    responseError(res, err, err.status)
  }
}
