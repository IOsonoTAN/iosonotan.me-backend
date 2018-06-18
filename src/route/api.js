import { validateToken } from '../middleware'
import { signIn, signUp } from '../controller/auth'

export default (app) => {
  app.get('/', (req, res) => {
    res.send('hello!')
  })

  app.post('/sign-in', signIn)
  app.post('/sign-up', signUp)

  app.post('/', validateToken, (req, res) => {
    res.send('POST!')
  })

  return app
}
