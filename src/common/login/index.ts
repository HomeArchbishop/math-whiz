import { storage, useStorageAsJSON } from '@/core/storage'

import LoginInfo from './model'

const LOGIN_INFO_KEY = 'math_whiz.login-info'

const useLoginInfoViaStorage = () => {
  const loginInfo = useStorageAsJSON<LoginInfo>(LOGIN_INFO_KEY) ?? new LoginInfo({})
  return loginInfo.isComplete() ? loginInfo : null
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

export const setLoginInfo = (loginInfo: LoginInfo) => {
  storage.setItemAsJSON(LOGIN_INFO_KEY, loginInfo, { secure: true })
}
