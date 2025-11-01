import { requestGuest } from '../request'
import { SuccessApiData } from './utils/model'

interface SigninResult {
  token: string
}

export const signup = async (
  username: string,
  password: string,
  childName: string,
  grade: 1 | 2 | 3 | 4 | 5 | 6,
) => {
  await requestGuest.post('/api/v1/auth/register', { username, password, childName, grade })
}

export const signin = async (username: string, password: string) => {
  const { data: { data: result } } = await requestGuest.post<SuccessApiData<SigninResult>>(
    '/api/v1/auth/login',
    { username, password },
  )
  return result
}
