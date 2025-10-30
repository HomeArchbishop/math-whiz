import LoginInfo from '@/common/login/model'

import { Middleware } from '../request-hub'

const authMiddleware = (loginInfo?: LoginInfo): Middleware => async (ctx) => {
  if (!loginInfo) return
  Object.assign(ctx.request, {
    headers: {
      ...ctx.request.headers,
      Authorization: `Bearer ${loginInfo.token}`,
    },
  })
}

export default authMiddleware
