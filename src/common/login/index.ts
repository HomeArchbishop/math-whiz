import { useStorage, useStorageAsJSON } from '@/core/storage'

import LoginInfo, { NotSecureLoginInfo } from './model'

const useLoginInfoViaStorage = () => {
  const token = useStorage('math_whiz:login-info_token', { secure: true })
  const partial = useStorageAsJSON<NotSecureLoginInfo>('math_whiz:login-info_partial') ?? {}
  const pending = new LoginInfo({
    ...partial,
    token,
  })
  return pending.isComplete() ? pending : null
}

const useLoginInfoViaRefresh = (perform: boolean) => {
  // TODO: via api refresh login info
  return perform ? null : null
}

/**
 * 获取登录信息 hook。
 * 任何需要登录信息的地方，都可以使用这个 hook。
 */
export const useLogin = () => {
  const loginInfoViaStorage = useLoginInfoViaStorage()
  const loginInfoViaRefresh = useLoginInfoViaRefresh(!!loginInfoViaStorage)
  return loginInfoViaStorage ?? loginInfoViaRefresh
}
