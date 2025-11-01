import LoginInfo from '../login/model'
import { requestAuth } from '../request'
import { SuccessApiData } from './utils/model'

interface UserProfileResult {
  user_id: number
  username: string
  child_name: string
  grade: number
  reminder_time: string
  created_at: string
}

/**
 * 获取用户资料
 */
export const getUserProfile = async (loginInfo: LoginInfo) => {
  const { data: { data: result } } = await requestAuth(loginInfo).get<SuccessApiData<UserProfileResult>>(
    '/api/v1/user/profile',
  )
  return result
}
