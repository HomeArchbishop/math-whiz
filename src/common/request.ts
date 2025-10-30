import authMiddleware from '@/core/request/middlewares/auth'
import baseUrlMiddleware from '@/core/request/middlewares/base-url'

import RequestHub from '../core/request/request-hub'
import LoginInfo from './login/model'

const baseUrl = 'https://api.example.com'

export const requestAuth = (loginInfo?: LoginInfo) => {
  const request = new RequestHub()
  request
    .use(baseUrlMiddleware(baseUrl))
    .use(authMiddleware(loginInfo))
  return request
}

export const requestGuest = requestAuth(undefined)
