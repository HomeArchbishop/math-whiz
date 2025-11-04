import authMiddleware from '@/common/request/middlewares/auth'
import baseUrlMiddleware from '@/common/request/middlewares/base-url'

import RequestHub from '../../core/request/request-hub'
import LoginInfo from '../login/model'
import { throwErrorMiddleware } from './middlewares/throw-error'

const baseUrl = 'http://150.158.118.75:5000'

export const requestAuth = (loginInfo?: LoginInfo) => {
  const request = new RequestHub()
  request
    .use(throwErrorMiddleware)
    .use(baseUrlMiddleware(baseUrl))
    .use(authMiddleware(loginInfo))
  return request
}

export const requestGuest = requestAuth(undefined)
