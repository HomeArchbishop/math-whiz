import { requestGuest } from '../request'

export const getLive = async () => {
  const { data } = await requestGuest.get('https://api.live.bilibili.com/room/v1/Room/get_info?room_id=22603245')
  return data
}
