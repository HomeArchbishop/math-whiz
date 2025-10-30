import LoginInfo from '@/common/login/model'
import { Middleware } from '@/core/request/model'

const authMiddleware = (loginInfo?: LoginInfo): Middleware => async (ctx, next) => {
  if (!loginInfo) return await next()
  ctx.request.headers = {
    ...ctx.request.headers,
    Authorization: `Bearer ${loginInfo.token}`,
  }
  await next()
}

export default authMiddleware
