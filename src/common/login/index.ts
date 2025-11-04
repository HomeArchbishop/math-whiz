import { useEffect, useState } from 'react'

import { storage, useStorageAsJSON } from '@/core/storage'

import LoginInfo from './model'

const LOGIN_INFO_KEY = 'math_whiz.login-info'

const useLoginInfoViaStorage = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null)
  const loginInfoJSON = useStorageAsJSON<LoginInfo>(LOGIN_INFO_KEY) ?? {}
  const newLoginInfo = new LoginInfo(loginInfoJSON)
  useEffect(() => {
    setLoginInfo(newLoginInfo)
  }, [newLoginInfo.value()])
  return loginInfo?.isComplete() ? loginInfo : null
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

export const setLoginInfo = (loginInfo: LoginInfo | null) => {
  if (loginInfo) {
    storage.setItemAsJSON(LOGIN_INFO_KEY, loginInfo)
  } else {
    storage.removeItem(LOGIN_INFO_KEY)
  }
}
