import { validateToken } from '../middleware'
import { signIn, signUp } from '../controller/auth'
import { blogList, blogDetail, createBlog, updateBlog } from '../controller/blog'

export default (app) => {
  app.post('/sign-in', signIn)
  app.post('/sign-up', signUp)

  app.get('/blog', blogList)
  app.get('/blog/:objectId', blogDetail)
  app.post('/blog', validateToken, createBlog)
  app.put('/blog', validateToken, updateBlog)

  return app
}
