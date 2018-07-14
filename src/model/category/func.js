import Blog from './schema'
import { DateTime } from 'luxon'

export const getContentById = async (objectId) => {
  const content = await Blog
    .findOne({ _id: objectId })
    .populate('user')

  return content
}

export const getContentList = async (page = 1, options = {}, limit = 9) => {
  try {
    const queryOptions = {
      status: (options.status ? options.status : 'published')
    }
    if (options.category) {
      queryOptions.category = options.category
    }
    if (options.tag) {
      queryOptions.tag = {
        '$in': [options.tag]
      }
    }

    const contents = await Blog.paginate({
      ...queryOptions,
      publishDate: {
        $lte: DateTime.local().toISO()
      }
    }, {
      page,
      limit,
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
