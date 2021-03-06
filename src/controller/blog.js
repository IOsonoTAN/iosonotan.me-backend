import Blog from '../model/blog'
import { responseError, throwError } from '../lib/response'

export const blogList = async (req, res) => {
  try {
    const { page, category, tag } = req.query
    const contents = await Blog.getContentList(page, {
      category,
      tag
    })

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
    const { _id: objectId, title, tag, category, detail, status, publishDate } = req.body

    const result = await Blog.updateBlog(objectId, {
      title, tag, category, detail, status, publishDate
    })

    res.send({
      body: req.body,
      result
    })
  } catch (err) {
    responseError(res, err, err.status)
  }
}
