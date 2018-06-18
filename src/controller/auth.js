import User from '../model/user'
import { responseError } from '../lib/response'

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body

    const isUser = await User.signIn(username, password)

    res.send(isUser)
  } catch (e) {
    responseError(res, e, e.status)
  }
}

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body

    const newUser = await User.signUp(username, password)

    res.send(newUser)
  } catch (e) {
    responseError(res, e, e.status)
  }
}
