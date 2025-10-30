import { Middleware } from '@/core/request/model'

const baseUrlMiddleware = (baseUrl: string): Middleware => async (ctx, next) => {
  if (/^https?:\/\//.test(ctx.request.url)) return await next()
  ctx.request = new Request(`${baseUrl}${ctx.request.url}`, ctx.request)
  await next()
}

export default baseUrlMiddleware
