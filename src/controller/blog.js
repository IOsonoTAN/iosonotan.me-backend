import Blog from '../model/blog'
import { responseError, throwError } from '../lib/response'

export const blogList = async (req, res) => {
  try {
    const { page } = req.query
    const contents = await Blog.getContentList(page)

    res.send(contents)
  } catch (err) {
    responseError(res, err, err.status)
  }
}

export const blogDetail = async (req, res) => {
  try {
    const { objectId } = req.params

    const content = await Blog.getContentById(objectId)

    res.send(content)
  } catch (err) {
    responseError(res, err, err.status)
  }
}

export const createBlog = async (req, res) => {
  try {
    const userId = req.auth.user._id

    if (!req.body.title) {
      throwError('missing params "title"')
    }

    const content = await Blog.createBlog(userId, req.body)

    res.send(content)
  } catch (err) {
    responseError(res, err, err.status)
  }
}

export const updateBlog = async (req, res) => {
  try {
    res.send('updateBlog')
  } catch (err) {
    responseError(res, err, err.status)
  }
}
