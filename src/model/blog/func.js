import Blog from './schema'
import { DateTime } from 'luxon'

export const getContentById = async (objectId) => {
  const content = await Blog
    .findOne({ _id: objectId })
    .populate('user')
  // const content = await Blog.findById(objectId)

  return content
}

export const getContentList = async (page = 1, options = {}) => {
  try {
    if (!options.status) {
      options.status = 'published'
    }
    if (!options.limit) {
      options.limit = 9
    }

    const contents = await Blog.paginate({
      status: options.status,
      publishDate: {
        $lte: DateTime.local().toISO()
      }
    }, {
      page,
      limit: options.limit,
      sort: {
        publishDate: -1
      }
    })

    return contents
  } catch (err) {
    throw err
  }
}

export const createBlog = async (user, data = {}) => {
  try {
    const object = new Blog({
      ...data,
      user
    })

    return await object.save()
  } catch (err) {
    throw err
  }
}

export default {
  getContentList,
  getContentById,
  createBlog
}
