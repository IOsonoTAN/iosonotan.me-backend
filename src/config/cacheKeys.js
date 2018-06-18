import { get } from 'lodash'
import { sprintf } from 'sprintf-js'

const cacheKeys = {
  user: {
    token: 'user:%(username)s:%(token)s:auth',
    wildcard: 'user:%(username)s:*'
  }
}

export default (prop, datas = {}) => {
  const cacheKey = get(cacheKeys, prop)

  return sprintf(cacheKey, datas)
}
