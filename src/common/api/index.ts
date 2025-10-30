import ApiCenter from '@/core/functional/api-center'

import * as sample from './sample'

const api = {
  ...sample,
} as const

const { useApi } = new ApiCenter(api)

export { useApi }
