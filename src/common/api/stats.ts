import qs from 'qs'

import LoginInfo from '../login/model'
import { requestAuth } from '../request'
import { SuccessApiData } from './utils/model'

interface DailyStatsRecord {
  date: string
  completed_count: number
  correct_count: number
  accuracy_rate: number
}

interface DailyStatsResult {
  records: DailyStatsRecord[]
}

/**
 * 获取每日统计
 */
export const getDailyStats = async (
  loginInfo: LoginInfo,
  startDate: string,
  endDate: string,
) => {
  const { data: { data: result } } = await requestAuth(loginInfo).get<SuccessApiData<DailyStatsResult>>(
    `/api/v1/stats/daily?${qs.stringify({ start_date: startDate, end_date: endDate })}`,
  )
  return result
}
