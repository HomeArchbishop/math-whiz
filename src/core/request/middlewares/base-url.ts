import { Middleware } from '../request-hub'

const baseUrlMiddleware = (baseUrl: string): Middleware => async (ctx) => {
  console.log('baseUrlMiddleware', baseUrl, ctx.request.url)
  if (/^https?:\/\//.test(ctx.request.url)) return
  ctx.request = new Request(`${baseUrl}${ctx.request.url}`, ctx.request)
}

export default baseUrlMiddleware
