import { get } from 'lodash'
import { sprintf } from 'sprintf-js'

const keys = {
  user: {
    token: 'user:%(token)s:token',
    wildcard: 'user:%(username)s:*'
  }
}

export default (prop, datas = {}) => {
  const cacheKey = get(keys, prop)

  return sprintf(cacheKey, datas)
}
