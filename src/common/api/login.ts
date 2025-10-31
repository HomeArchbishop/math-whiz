import { requestGuest } from '../request'
import { SuccessApiData } from './utils/model'

interface SignupParams {
  username: string
  password: string
  child_name?: string
  grade: 1 | 2 | 3 | 4 | 5 | 6
}

interface LoginParams {
  username: string
  password: string
}

interface LoginResult {
  access_token: string
  refresh_token: string
}

export const signup = async (params: SignupParams) => {
  return await requestGuest.post('/api/v1/auth/register', params)
}

export const login = async (params: LoginParams) => {
  const { data: { data: result } } = await requestGuest.post<SuccessApiData<LoginResult>>(
    '/api/v1/auth/login',
    params,
  )
  return result
}
