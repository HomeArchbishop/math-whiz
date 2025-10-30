import { Retcode, RetcodeError } from '@/common/request/retcode'
import { Middleware } from '@/core/request/model'

export const throwErrorMiddleware: Middleware = async (ctx, next) => {
  await next()
  if (ctx.response.status === 0) {
    // 0 means no response
    throw new RetcodeError(Retcode.NO_RESPONSE, 'No response')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = ctx.response.data as any
  // 这里避免有些外部接口返回的数据没有 retcode 字段，
  // data.retcode 为 undefined 时，不会抛出错误
  if (data.retcode && data.retcode !== Retcode.SUCCESS) {
    throw new RetcodeError(data.retcode, data.message)
  }
}
