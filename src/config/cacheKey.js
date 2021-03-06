import { get } from 'lodash'
import { sprintf } from 'sprintf-js'

export const keys = {
  user: {
    token: 'user:%(token)s:token',
    uToken: 'user:%(username)s:utoken',
    wildcard: 'user:%(username)s:*'
  }
}

export default (prop, datas = {}) => {
  const cacheKey = get(keys, prop)

  return sprintf(cacheKey, datas)
}
