import ApiCenter from '@/core/functional/api-center'

import * as login from './login'
import * as quiz from './quiz'
import * as stats from './stats'
import * as user from './user'

const api = {
  ...login,
  ...quiz,
  ...stats,
  ...user,
} as const

const { useApi } = new ApiCenter(api)

export { useApi }
